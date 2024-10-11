import { NextRequest, NextResponse } from 'next/server';
import { Leads } from '@/services/leads';
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from 'mime';

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const parsed = Leads.formSchema.safeParse({
    ...rawData,
    visas: rawData.visas?.toString().split(','),
  });
  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: parsed.error.message });
  }
  const resume = formData.get('resume') as File || null;
  const buffer = Buffer.from(await resume.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
  .toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    await stat(uploadDir);
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    if (e?.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {

      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json({ status: "error", message: 'Cant create upload dir' });
    }
  }
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${resume.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(resume.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    const lead = parsed.data;
    Leads.setLead({
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      website: lead.website,
      citizenship: lead.citizenship,
      resume: fileUrl,
      visas: lead.visas.toString()?.split(','),
      message: lead.message,
      submit_date: new Date().toUTCString(),
      status: 'PENDING',
    });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
  return NextResponse.json({ status: "success" });
};
