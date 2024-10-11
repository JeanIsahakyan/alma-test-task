"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dice5, Heart, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leads } from '@/services/leads';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { store } from '@/store/store';
import { formActions, useFormSelector } from '@/store/form';

const FormSchema = Leads.formSchema;


const visas = [
  {
    id: "o1",
    label: "O-1",
  },
  {
    id: "eb1a",
    label: "EB-1A",
  },
  {
    id: "eb2niw",
    label: "EB-2 NIW",
  },
  {
    id: "idk",
    label: "I don't know",
  },
] as const


const countries = ['Armenia', 'Russia', 'United States', 'Germany'] as const;

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      website: '',
      visas: [],
      resume: undefined,
      citizenship: '',
      message: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    store.dispatch(formActions.addLeadWorker(data));
  }
  const { success, loading, error } = useFormSelector();

  if (success) {
    return (
      <div className="max-w-screen-sm p-4 mx-auto mt-10">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Save className="w-16 h-16"/>
          </div>
          <h1 className="font-bold text-2xl mt-3">Thank You</h1>
          <p className="font-bold mt-3 text-md">
            Your information was submitted to our team of immigration Attorneys. Expect an email from hello@tryalma.ai
          </p>
          <Link href="/" onClick={() => store.dispatch(formActions.setForm({success: false}))}>
            <Button type="submit" size="lg" className="text-md p-4 mt-10 font-bold w-full">Go Back to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <div className=" bg-[#d9dea6] lg:py-20 py-10 lg:px-0 px-3">
        <div className="max-w-screen-md mx-auto">
          <Logo className="w-16"/>
          <div className="lg:text-5xl mt-10 font-bold text-2xl">
            Get An Assessment
            <div>
              Of Your Immigration Case
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-sm p-4 mx-auto mt-10">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Save className="w-16 h-16"/>
          </div>
          <h1 className="font-bold text-2xl mt-3">Want to undersand your visa options?</h1>
          <p className="font-bold mt-3 text-md">
            Submit the form below, and our team of experienced attorneys will review your information and send a
            preliminary assessment of your case based on your goals.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/3 mx-auto mt-12 space-y-4">
            {!!error && (
              <div className="text-center text-red-400 border-red-500 p-4 border rounded-xl">
                {error}
              </div>
            )}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Country of Citizenship"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.slice().map((name: string) => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Linkedin / Personal Website URL" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e?.currentTarget?.files[0])} accept="*.pdf,*.jpg,*.png"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormItem>
              <div className="mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Dice5 className="w-16 h-16"/>
                  </div>
                  <h1 className="font-bold text-2xl mt-3">Visa categories of interest?</h1>
                </div>
              </div>
              {visas.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="visas"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage/>
            </FormItem>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Heart className="w-16 h-16"/>
                      </div>
                      <h1 className="font-bold text-2xl mt-3">How can we help you?</h1>
                    </div>
                  </div>
                  <FormControl>
                    <Textarea className="min-h-40"
                              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="text-md p-4 font-bold w-full" disabled={loading}>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}


