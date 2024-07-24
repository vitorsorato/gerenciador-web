import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { createActivity, deleteActivity, updateActivity } from '@/services/activities';



type HandleActivityInformationProps = {
  children: React.ReactNode;
  activityId?: string;
  onActivitysChange: any;
  name: string;
  startDate: Date; 
  endDate: Date;
  projectId: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(50),
  startDate: z.date({
    required_error: 'Data de início é obrigatória',
  })
  .optional(),
  endDate: z.date({
			required_error: 'Data final é obrigatória',
		})
		.optional(),
});

export default function HandleActivityInformation({ children, ...props }: HandleActivityInformationProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  function cleanModal() {
    form.reset({
      name: '',
      startDate: new Date(),
      endDate:  new Date(),
    });
  }

  async function handleDelete() {
    if (props.activityId) {
      await deleteActivity(props.activityId); 
    }
    handleOnActivitysChange();
  }

  async function retrieveActivityInformation() {
    form.reset({
      name: props.name || '',
      startDate: new Date(props.startDate) || new Date(),
      endDate: new Date(props.endDate) || new Date(),
    });
  }

  async function updateactivityInformation(values: z.infer<typeof formSchema>) {
    try {

      if (props.activityId) {
        var formactivityUpdate = {
          id: props.activityId,
          projectId: Number(props.projectId),
          name: values.name,
          startDate: values.startDate ? values.startDate : new Date(),
          endDate: values.endDate ? values.endDate : new Date(),
        };
        await updateActivity(props.activityId, formactivityUpdate);
      } else {
        var formCreateactivity = {
          projectId: Number(props.projectId),
          name: values.name,
          startDate: values.startDate ? values.startDate : new Date(),
          endDate: values.endDate ? values.endDate : new Date(),
        };
        await createActivity(formCreateactivity);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!props.activityId) {
        cleanModal();
      }
      handleOnActivitysChange();
    }
  }

  useEffect(() => {
    if (props.activityId && open) {
      retrieveActivityInformation();
    }
  }, [props.activityId, open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateactivityInformation(values);
    setOpen(false);
  }

  const handleOnActivitysChange = () => {
    props.onActivitysChange();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.activityId ? 'Editando Atividade' : 'Nova Atividade'}</DialogTitle>
          <DialogDescription>
            {props.activityId ? 'Altere os dados desta atividade.' : 'Insira os dados desta atividade.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-4">
            <FormField
              control={form.control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              defaultValue={props.startDate || ''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
                  <Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-zinc-500',
													)}
												>
													{field.value ? (
														dayjs(field.value).format('DD/MM/YYYY')
													) : (
														<span>Escolha uma data</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												captionLayout="dropdown-buttons"
												fromYear={1920}
												toYear={2200}
												selected={field.value}
												onSelect={field.onChange}
												onMonthChange={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              defaultValue={props.endDate || ''}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Final</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-zinc-500',
													)}
												>
													{field.value ? (
														dayjs(field.value).format('DD/MM/YYYY')
													) : (
														<span>Escolha uma data</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												captionLayout="dropdown-buttons"
												fromYear={1920}
												toYear={2200}
												selected={field.value}
												onSelect={field.onChange}
												onMonthChange={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 md:gap-0">
              {props.activityId && (
                <Button variant={'destructive'} onClick={handleDelete} className="justify-self-end">
                  Deletar Atividade
                </Button>
              )}
              <Button type="submit" className="justify-self-end">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
