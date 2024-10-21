import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import * as style from './Project.css';
import Flexbox from '../../Flexbox';
import Typography from '../../Typography';
import Icon from '../../Icon';
import { HiUser } from 'react-icons/hi2';
import { useNavBarStore } from '../../../stores/navbarStore';

interface ProjectProps {
  project: number[];
}

export const Project = ({ project }: ProjectProps) => {
  const navbarStore = useNavBarStore();

  return (
    <Slider
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      arrows={false}
      afterChange={(current) => navbarStore.setProject(current)}
    >
      {project.map((v, i) => (
        <div key={i} className={style.container}>
          <Flexbox
            bg={200}
            flexDirection="row"
            justifyContent="start"
            columnGap={1}
            padding="1rem"
            rounded={0.5}
          >
            <img src="/assets/sample.png" className={style.logo} />
            <div>
              <Typography weight="700">프로젝트 {v + 1}</Typography>
              <Flexbox
                bg="none"
                justifyContent="start"
                columnGap={0.125}
                margin="0.25rem 0 0 0 0"
              >
                <Icon color="disabled" background="none" size={1}>
                  <HiUser />
                </Icon>
                <Typography size={0.875} weight="700" color="disabled">
                  {v + 5}명
                </Typography>
              </Flexbox>
            </div>
          </Flexbox>
        </div>
      ))}
    </Slider>
  );
};
