import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { getStoryById } from '../../store/storiesSlice.js';
import Story from '../../components/Story/Story.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';


const StoryPage = () => {
  const { id } = useParams();
  const storyId = Number(id);
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.stories.loadingStatus);
  const isIdLoaded = useSelector(storiesSelectors.selectIds).includes(storyId);
  console.log('isIdLoaded=', isIdLoaded)

  useEffect(() => {
    const getStory = async (id) => {
      console.log('СКАЧИВАЮ')
      dispatch(getStoryById(id))
      console.log('СКАЧАЛ');
    };

    if (isIdLoaded) {
      console.log('ИСТОРИЯ уже есть!')
      return;
    } else {
      console.log('ИСТОРИЮ надо скачать!')
      getStory(storyId);
    }
  }, [id]);

  const stories = useSelector(storiesSelectors.selectAll);
  const story = stories.find((story) => story.id === storyId);
  console.log('STORY=', story)

  return (
    <>
      {
        loadingStatus === 'loading'
          ? <Spinner />
          : <Story story={story} />
      }
    </>
  )
};

export default StoryPage;
