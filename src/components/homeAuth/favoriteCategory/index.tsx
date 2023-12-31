import courseService from '@/src/services/courseService';
import styles from '@/styles/slideCategory.module.scss';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import { Container } from 'reactstrap';
import PageSpinner from '../../common/spinner';

export default function FavoriteCategory() {
	const { data, error } = useSWR('/favorites', courseService.getFavCourses);

	if (error) return error;
	if (!data) {
		return <PageSpinner />;
	}
	return (
		<>
			<h1 className={styles.titleCategory}>Minha Lista</h1>
			{data.data.courses.length >= 1 ? (
				<SlideComponent course={data.data.courses} />
			) : (
				<p className="text-center pt-3 h5">
					<strong>Você Não tem nenhum curso na lista de favoritos</strong>
				</p>
			)}
		</>
	);
}
