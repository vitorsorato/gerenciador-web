import { useCallback, useState } from 'react';

import { BadgePlus, Clipboard } from 'lucide-react';

import { getActivities } from '@/services/activities';

import HandleActivityInformation from '../modal/HandleActivityInformation';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useToast } from '../ui/use-toast';
import ActivityCard from './activityCard';

export function ActivitySheet(props: { id: string; name : string; }) {

	type ActivitiesResponse = {
		id: string;
		name: string;
		startDate: Date;
		endDate: Date;
		completed: boolean;
	  };

	const [cards, setCards] = useState<ActivitiesResponse[]>([]);
	const { toast } = useToast();

	const loadActivities = useCallback(async () => {
		try {
			const response = (await getActivities(props.id)) as Response;
			const data = await response.json();
			setCards(data);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Não foi possível carregar as atividades',
				description: JSON.stringify((error as any).message),
			});
		}
	}, [props.id, toast]);

	const handleOpen = async () => {
		await loadActivities();
	};

	return (
		<Sheet onOpenChange={handleOpen}>
			<SheetTrigger asChild>
				<Button size={'icon'} variant={'ghost'}>
					<Clipboard className="h-4 w-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full overflow-auto">
				<SheetHeader>
					<SheetTitle>Atividades</SheetTitle>
					<SheetDescription>{'Atividades relacionadas ao projeto '  + props.name + '.'}</SheetDescription>
				</SheetHeader>
				<div className="mt-4 grid gap-2">
					{cards?.length === 0 ? (
						<div className="flex justify-start">
							<p className="order-2 text-sm text-gray-400">Nenhuma atividade criada.</p>
						</div>
					) : (
						cards?.map((activity, index) => (
							<div key={index}>
								<ActivityCard 
									id={activity.id} 
									projectId={props.id} 
									onActivitiesChange={loadActivities} 
									name={activity.name} 
									endDate={activity.endDate} 
									startDate={activity.startDate} 
									completed={activity.completed} 
								/>
							</div>
						))
					)}
					<HandleActivityInformation 
						projectId={props.id} 
						name={''} 
						startDate={new Date()} 
						endDate={new Date()} 
						onActivitysChange={loadActivities}>
						<Button>
							<BadgePlus className="mr-2 h-4 w-4" />
							Atividade
						</Button>
					</HandleActivityInformation>
				</div>
			</SheetContent>
		</Sheet>
	);
}
