import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useParams } from 'react-router-dom';
import { getStoryById, selectors as storiesSelectors } from '../../store/storiesSlice';
import Story from '../../components/Story/Story';
import Spinner from '../../components/Spinner/Spinner';
import { Id, Item } from '../../types/index';


const StoryPage = (): JSX.Element => {
  const { id } = useParams<{id: string}>();
  const storyId = Number(id) as Id;
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) => state.stories.loadingStatus);
  const isStoryAlreadyStored = useAppSelector(storiesSelectors.selectIds).includes(storyId);

  useEffect(() => {
    const getStory = async (id: Id) => {
      dispatch(getStoryById(id));
    };

    if (isStoryAlreadyStored) {
      return;
    } else {
      getStory(storyId);
    }
  }, [id]);

  const story = useAppSelector((state) => storiesSelectors.selectById(state, storyId)) as Item;

  return (
    <>
      {loadingStatus === 'loading' && <Spinner />}
      {story && <Story story={story} />}
    </>
  );
};

export default StoryPage;
