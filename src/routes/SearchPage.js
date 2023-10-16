import { useOutletContext } from 'react-router-dom';
import ListPodcast from '../components/Podcast/ListPodcast';
import MenuWrapper from '../components/Common/MenuWrapper';

const HEADERS = [
    '#',
    'Name',
    'Description',
    'Release'
];

const SearchPage = () => {
    const { podcast } = useOutletContext();
    return (
        <>
            {
                podcast.length > 0 &&
                <>
                    <MenuWrapper 
                        options={['Name', 'Release']}  />
                    <ListPodcast headers={HEADERS} list={podcast}/>
                </>
            }
        </>
    );
}

export default SearchPage;