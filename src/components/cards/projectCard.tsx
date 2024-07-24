import { Pencil } from 'lucide-react';
import HandleProjectInformation from '../modal/HandleProjectInformation';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ActivitySheet } from './activitySheet';
import { Progress } from '../ui/progress';

export default function ProjectCard(props: { id: string, onProjectsChange: () => Promise<void>; name: string, endDate: Date, startDate: Date, percentComplete: number }) {

	const stringStartDate = new Date(props.startDate).toLocaleDateString('pt-BR');
	const stringEndDate = new Date(props.endDate).toLocaleDateString('pt-BR');
	const stringDescription = "De " + stringStartDate + " até " + stringEndDate + "." 

	return (
		<Card>
			<CardHeader className="pb-0">
				<CardTitle className="truncate text-lg">{props.name}</CardTitle>
				<CardDescription title={props.name} className="truncate">
				 	{stringDescription}
				</CardDescription>
			</CardHeader>
			<CardFooter className="justify-between p-4">
				<div>
				<ActivitySheet onProjectsChange={props.onProjectsChange} name={props.name} id={props.id}></ActivitySheet>
				<HandleProjectInformation onProjectsChange={props.onProjectsChange} startDate={props.startDate} endDate={props.endDate} projectId={props.id} name={props.name}>
					<Button size={'icon'} variant={'ghost'}>
						<Pencil className="h-4 w-4" />
					</Button>
				</HandleProjectInformation>
				</div>
				<Progress value={props.percentComplete} className="w-12 mr-4"/>
			</CardFooter>
		</Card>
	);
}
