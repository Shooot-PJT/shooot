import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import * as style from './Project.css';
import Flexbox from '../../Flexbox';
import Typography from '../../Typography';
import Icon from '../../Icon';
import { HiPlus, HiUser } from 'react-icons/hi2';
import theme from '../../../styles/theme.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyProjectList } from '../../../pages/MyProject/apis';
import { useEffect } from 'react';
import { useNavBarStore } from '../../../stores/navbarStore';

interface ProjectProps {
  addProjectModalHandler: () => void;
}

export const Project = ({ addProjectModalHandler }: ProjectProps) => {
  const navbarStore = useNavBarStore();
  const projectsListQuery = useSuspenseQuery({
    queryKey: ['project-list'],
    queryFn: async () => await getMyProjectList(),
    staleTime: 3000,
  });

  if (projectsListQuery.error && !projectsListQuery.isFetching) {
    throw projectsListQuery.error;
  }

  useEffect(() => {
    navbarStore.setProject(
      projectsListQuery.data.data.length
        ? projectsListQuery.data.data[0].projectId
        : 0,
    );
  }, []);

  return (
    <>
      {projectsListQuery.data.data.length ? (
        <div className="slider-container">
          <Slider
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            afterChange={(current) => {
              navbarStore.setProject(
                projectsListQuery.data.data[current].projectId,
              );
            }}
          >
            {projectsListQuery.data.data.map((info) => (
              <div key={info.name}>
                <Flexbox
                  justifyContents="start"
                  alignItems="center"
                  style={{
                    columnGap: '1rem',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: theme.color.background['200'],
                  }}
                >
                  <img src={info.logoImageUrl} className={style.logo} />
                  <div>
                    <Typography weight="700">{info.name}</Typography>
                    <Flexbox
                      justifyContents="start"
                      alignItems="center"
                      style={{
                        columnGap: '0.125rem',
                        margin: '0.25rem 0 0 0',
                        backgroundColor: theme.color.background['200'],
                      }}
                    >
                      <Icon color="disabled" background="none" size={1}>
                        <HiUser />
                      </Icon>
                      <Typography size={0.875} weight="700" color="disabled">
                        {info.userCount}명
                      </Typography>
                    </Flexbox>
                  </div>
                </Flexbox>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <Flexbox
          flexDirections="col"
          justifyContents="center"
          alignItems="center"
          style={{
            boxSizing: 'border-box',
            padding: '1rem 5rem',
            rowGap: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: theme.color.background['300'],
            cursor: 'pointer',
          }}
          onClick={addProjectModalHandler}
        >
          <Icon size={2} color="light" background="none">
            <HiPlus />
          </Icon>
          <Typography size={0.875}>프로젝트 생성하기</Typography>
        </Flexbox>
      )}
    </>
  );
};
