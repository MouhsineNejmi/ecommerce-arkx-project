import Carousel from '../components/carousel.component';

const slides = [
  {
    title: 'Slide 1',
    description: 'Description for Slide 1',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Slide 2',
    description: 'Description for Slide 2',
    image: 'https://placekitten.com/800/401',
  },
  {
    title: 'Slide 3',
    description: 'Description for Slide 3',
    image: 'https://placekitten.com/800/402',
  },
];

const Home = () => {
  return (
    <>
      <Carousel slides={slides} />
    </>
  );
};

export default Home;
