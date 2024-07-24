import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import HandleActivityInformation from '../modal/HandleActivityInformation';
import { Checkbox } from '../ui/checkbox';
import { setCheckedActivity } from '@/services/activities';


export default function ActivityCard(props: {id: string, projectId: string, onActivitiesChange: () => Promise<void>; name: string, endDate: Date, startDate: Date, completed: boolean }) {
	// eslint-disable-next-line no-unused-vars
	
	const stringStartDate = new Date(props.startDate).toLocaleDateString('pt-BR');
	const stringEndDate = new Date(props.endDate).toLocaleDateString('pt-BR');
	const stringDescription = stringStartDate + " até " + stringEndDate

	const handleChecked = async () => {
		try {
			await setCheckedActivity(props.id);
			props.onActivitiesChange();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card>
			<CardHeader className="py-4">
				<CardTitle className="truncate text-lg justify-between flex">{props.name}
				<Checkbox
						className='mt-2'
						checked={props.completed}
						onCheckedChange={handleChecked}
						/>
				</CardTitle>
				<CardDescription title={props.name} className="truncate">
				 	{stringDescription}
				</CardDescription>
			</CardHeader>
			<CardFooter>
			<HandleActivityInformation activityId={props.id} onActivitysChange={props.onActivitiesChange} startDate={props.startDate} endDate={props.endDate} projectId={props.projectId} name={props.name}>
				<Button size={'sm'} variant={'secondary'}>
					<Pencil className="h-4 w-4" />
				</Button>
			</HandleActivityInformation>
			</CardFooter>
		</Card>
	);
}
