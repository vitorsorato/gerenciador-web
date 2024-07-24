
import ProjectCard from '@/components/cards/projectCard';
import HeaderNav from '@/components/general/navbar/HeaderNav';
import HandleProjectInformation from '@/components/modal/HandleProjectInformation';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/services/projects';
import { BadgePlus } from 'lucide-react';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type ProjectsResponse = {
  	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	percentComplete: number;
};

export default function DashboardPage() {
  const [cards, setCards] = useState<ProjectsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const loadProjects = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = (await getProjects()) as Response;
			const data = await response.json();
			setCards(data);
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Não foi possivel carregar os plugins',
				description: JSON.stringify((error as any).message),
			});
		}finally{
			setIsLoading(false);
		}
	}, [toast]);

  useEffect(() => {
		if (!cards.length) {
			loadProjects();
		}
	}, [cards.length, loadProjects]);


  return (
    <>
      <Head>
        <title>Projetos | Artia</title>
      </Head>
      <HeaderNav />
      <div className="mt-4 p-8">
        <div className='flex justify-between pb-3'>
          <h2 className="text-2xl font-bold tracking-tight pb-4">Projetos</h2>
          <HandleProjectInformation name={''} startDate={new Date()} endDate={new Date()} onProjectsChange={loadProjects}>
              <Button>
                <BadgePlus className="mr-2 h-4 w-4" />
                Projeto
              </Button>
            </HandleProjectInformation>
          </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {cards && Array.isArray(cards) ? (
				cards.length === 0 && !isLoading ? (
			<div className="flex justify-start">
				<p className="order-2 text-sm text-gray-400">Nenhum projeto criado.</p>
			</div>
		) : (
			cards?.map((project, index) => (
				<ProjectCard
					onProjectsChange={loadProjects}
					key={index}
					id={project.id}
					name={project.name}
					startDate={project.startDate}
					endDate={project.endDate}
					percentComplete={project.percentComplete}
				/>
			))
		)
	) : null}
        </div>
      </div>
    </>
  );
}
