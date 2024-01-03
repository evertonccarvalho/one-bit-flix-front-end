import courseService from '@/src/services/courseService';
import styles from '@/styles/slideCategory.module.scss';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import { Container } from 'reactstrap';
import PageSpinner from '../../common/spinner';

export default function FeaturedCategory() {
	const { data, error } = useSWR('/featured', courseService.getFeaturedCourses);

	if (error) return error;
	if (!data) {
		return <PageSpinner />;
	}
	return (
		<>
			<p className={styles.titleCategory}>Em Destaque</p>
			<SlideComponent course={data.data} />
		</>
	);
}
