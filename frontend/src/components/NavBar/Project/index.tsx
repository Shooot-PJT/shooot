import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import * as style from './Project.css';
import Flexbox from '../../Flexbox';
import Typography from '../../Typography';
import Icon from '../../Icon';
import { HiUser } from 'react-icons/hi2';
import { useNavBarStore } from '../../../stores/navbarStore';
import theme from '../../../styles/theme.css';

interface ProjectProps {
  project: number[];
}

export const Project = ({ project }: ProjectProps) => {
  const navbarStore = useNavBarStore();

  return (
    <div className="slider-container">
      <Slider
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        afterChange={(current) => navbarStore.setProject(current)}
      >
        {project.map((v) => (
          <div key={v}>
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
              <img src="/assets/sample.png" className={style.logo} />
              <div>
                <Typography weight="700">프로젝트 {v + 1}</Typography>
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
                    {v + 5}명
                  </Typography>
                </Flexbox>
              </div>
            </Flexbox>
          </div>
        ))}
      </Slider>
    </div>
  );
};
