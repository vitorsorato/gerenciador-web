import { BadgePlus, Clipboard } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import HandleActivityInformation from '../modal/HandleActivityInformation';
import { useCallback, useState } from 'react';
import { getActivities } from '@/services/activities';
import { useToast } from '../ui/use-toast';

export function ActivitySheet(props: { id: string; type: string; name : string; }) {

	type ActivitiesResponse = {
		id: string;
		  name: string;
		  startDate: Date;
		  endDate: Date;
	  };

	const [cards, setCards] = useState<ActivitiesResponse[]>([]);
	const { toast } = useToast();

	const loadProjects = useCallback(async () => {
		try {
			const response = (await getActivities(props.id)) as Response;
			const data = await response.json();
			setCards(data);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Não foi possivel carregar os plugins',
				description: JSON.stringify((error as any).message),
			});
		}
	}, [toast]);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={'icon'} variant={'ghost'} onClick={()=>{}}>
				<Clipboard className="h-4 w-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full overflow-auto">
				<SheetHeader>
					<SheetTitle>Atividades</SheetTitle>
					<SheetDescription>{'Atividades relacionadas ao projeto '  + props.name + '.'}</SheetDescription>
				</SheetHeader>

				<div className="mt-4 grid gap-2">

				{cards?.length === 0? (
			<div className="flex justify-start">
				<p className="order-2 text-sm text-gray-400">Nenhum projeto criado.</p>
			</div>
		) : (
			cards?.map((project, index) => (
				<div key={index}>{project.name}</div>
			))
		)}

				<HandleActivityInformation name={''} startDate={new Date()} endDate={new Date()} onActivitysChange={loadProjects}>
					<Button>
						<BadgePlus className="mr-2 h-4 w-4" />
						Projeto
					</Button>
            	</HandleActivityInformation>
				</div>
			</SheetContent>
		</Sheet>
	);
}
