import Head from 'next/head';
import styles from '../styles/HomeNoAuth.module.scss';
import HeaderNoAuth from '@/src/components/homeNoAuth/headerNoAuth';
import PresentationSection from '@/src/components/homeNoAuth/presentationSection';
import CardsSection from '@/src/components/homeNoAuth/cardSection';
import SlideSection from '@/src/components/homeNoAuth/slideSection';
import { CourseType } from '@/src/services/courseService';
import { ReactNode, useEffect } from 'react';
import Footer from '@/src/components/commom/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
interface IndexPageProps {
	children?: ReactNode;
	course: CourseType[];
}

export default function HomeNoAuth({ course }: IndexPageProps) {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<>
			<Head>
				<title>OneBtiFlix</title>
				<link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
				<meta property="og:title" content="OneBitFlix" key="title" />
				<meta
					name="descritpion"
					content="Tenha acesso aso melhores conteúdos de promgração de uma forma simples e fácil"
				/>
			</Head>
			<main>
				<div
					className={styles.sectionBackground}
					data-aos="fade-zoom-in"
					data-aos-duration="1600"
				>
					<HeaderNoAuth />
					<PresentationSection />
				</div>
				<div data-aos="fade-right" data-aos-duration="1200">
					<CardsSection />
				</div>
				<div data-aos="fade-up" data-aos-duration="1350">
					<SlideSection newestCourses={course} />
				</div>
				<Footer />
			</main>
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch('URL_DA_SUA_API_AQUI');
		const data = await res.json();

		return {
			props: {
				course: data || [], // Garantindo que data seja um array ou um valor vazio
			},
			revalidate: 3600 * 24,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				course: [], // Definindo um array vazio em caso de erro na requisição
			},
			revalidate: 3600 * 24,
		};
	}
}
