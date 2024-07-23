export default function Home() {
	return (<>Hello, Artia!!</>);
}

export async function getServerSideProps() {
		return { redirect: { destination: '/projetos' } };
}
