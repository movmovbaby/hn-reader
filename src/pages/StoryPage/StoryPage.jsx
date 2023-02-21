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
  const isStoryAlreadyStored = useSelector(storiesSelectors.selectIds).includes(storyId);

  useEffect(() => {
    const getStory = async (id) => {
      dispatch(getStoryById(id))
    };

    if (isStoryAlreadyStored) {
      return;
    } else {
      getStory(storyId);
    }
  }, [id]);

  const story = useSelector((state) => storiesSelectors.selectById(state, storyId));

  return (
    <>
      {loadingStatus === 'loading' && <Spinner />}
      {story && <Story story={story} />}
    </>
  )
};

export default StoryPage;
