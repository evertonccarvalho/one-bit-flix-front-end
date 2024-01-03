import styles from '@/styles/slideCategory.module.scss';
import courseService from '@/src/services/courseService';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import { Container } from 'reactstrap';
import PageSpinner from '../../common/spinner';
export default function NewestCategory() {
	const { data, error } = useSWR('/newest', courseService.getNewestCourses);

	if (error) return error;
	if (!data) {
		return <PageSpinner />;
	}
	return (
		<>
			<p className={styles.titleCategory}>Lançamentos</p>
			<SlideComponent course={data.data} />
		</>
	);
}
