import {Link, useHistory} from 'react-router-dom';
import { NEWS_PER_PAGE } from '../../constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageNumber: number;
}

const Pagination = ({pageNumber}: PaginationProps): JSX.Element => {
  const history = useHistory();
  const handleClick = () => history.push(`/${pageNumber}`);

  const pagesNumber = Math.ceil(100 / NEWS_PER_PAGE);
  const pages: number[] = [];
  
  for (let i = 0; i < pagesNumber; i += 1) {
    pages.push(i + 1);
  }
  return (
    <>
      <ul className={styles['pagination']}>
        {
          pages.map((page: number): JSX.Element => {
            let className = styles['pagination__item'];
            if (page === pageNumber) {
              className += ' ' + styles['pagination__item--active'];
            }

            return (
              <li key={page} className={className}>
                <Link to={`/${page}`} onClick={handleClick} className={styles['pagination__page-number']}>{page}</Link>
              </li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Pagination;
