import { fetchData } from "./api/requestHandler"

type ProjectInformation = {
	name: string;
	startDate: Date;
	endDate: Date;
};

type ProjectUpdateInformation = {
  id: string
	name: string;
	startDate: Date;
	endDate: Date;
};

export async function createActivity(projectInformation: ProjectInformation) {
	return await fetchData('/activities', projectInformation, 'POST')
}

export async function updateActivity(id: string, projectInformation: ProjectUpdateInformation) {
	return await fetchData(`/activities/${id}`, projectInformation, 'PUT')
}

export async function getActivities(id: string) {
	return await fetchData(`/activities/${id}`, null, 'GET')
}


