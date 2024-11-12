import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import * as style from './Project.css';
import { HiPlus, HiUser } from 'react-icons/hi2';
import theme from '../../../../../styles/theme.css';
import { useEffect, useRef } from 'react';
import { useNavBar, useReadProjectList } from '../../../hooks';
import { useResize } from '../../../../../hooks/useResize';
import { useNavBarStore } from '../../../../../stores/navbarStore';
import Typography from '../../../../../components/Typography';
import Flexbox from '../../../../../components/Flexbox';
import Icon from '../../../../../components/Icon';

export const Project = () => {
  /* 필요 정보 */
  const { isLarge } = useResize();
  const navbarStore = useNavBarStore();
  const { projectList, isLoading } = useReadProjectList();
  const { addProjectModalHandler } = useNavBar();

  /* 자원 관리 */
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    projectList?.data.forEach((project, idx: number) => {
      if (navbarStore.project === project.projectId) {
        sliderRef.current?.slickGoTo(idx);
      }
    });
  }, [projectList]);

  useEffect(() => {
    navbarStore.setProject(
      projectList?.data.length ? projectList?.data[0].projectId : 0,
    );
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Typography>프로젝트 리스트 로딩중</Typography>
      ) : (
        <>
          {projectList?.data.length ? (
            <>
              {projectList?.data.length === 1 ? (
                <Flexbox
                  justifyContents="start"
                  alignItems="center"
                  style={{
                    width: isLarge ? '90%' : '50%',
                    boxSizing: 'border-box',
                    padding: '1rem',
                    columnGap: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: theme.color.background['200'],
                  }}
                >
                  <img
                    src={projectList?.data[0].logoImageUrl}
                    className={style.logo}
                  />
                  <div>
                    <Typography weight="700">
                      {projectList?.data[0].name}
                    </Typography>
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
                        {projectList?.data[0].userCount}명
                      </Typography>
                    </Flexbox>
                  </div>
                </Flexbox>
              ) : (
                <>
                  <div className="slider-container">
                    <Slider
                      ref={(slider) => (sliderRef.current = slider)}
                      speed={500}
                      slidesToShow={1}
                      slidesToScroll={1}
                      afterChange={(current) => {
                        navbarStore.setProject(
                          projectList?.data[current].projectId,
                        );
                      }}
                    >
                      {projectList?.data.map((info) => (
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
                            <img
                              src={info.logoImageUrl}
                              className={style.logo}
                            />
                            <div>
                              <Typography weight="700">{info.name}</Typography>
                              <Flexbox
                                justifyContents="start"
                                alignItems="center"
                                style={{
                                  columnGap: '0.125rem',
                                  margin: '0.25rem 0 0 0',
                                  backgroundColor:
                                    theme.color.background['200'],
                                }}
                              >
                                <Icon
                                  color="disabled"
                                  background="none"
                                  size={1}
                                >
                                  <HiUser />
                                </Icon>
                                <Typography
                                  size={0.875}
                                  weight="700"
                                  color="disabled"
                                >
                                  {info.userCount}명
                                </Typography>
                              </Flexbox>
                            </div>
                          </Flexbox>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </>
              )}
            </>
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
      )}
    </>
  );
};
