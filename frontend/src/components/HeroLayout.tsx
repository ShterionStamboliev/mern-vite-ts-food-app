import hero from '../assets/BurgerHero.jpg';

const HeroLayout = () => {
    return (
        <div className='md:flex items-center bg-gray-100'>
            <div className='flex-1 h-auto text-center'>
                <h1 className='text-4xl font-bold tracking-tight text-orange-600'>
                    Order fingerlicious food now
                </h1>
                <h2 className='text-2xl font-bold tracking-tight text-orange-600 py-2'>
                    Your next meal is just a click away
                </h2>
            </div>

            <div className='flex-1'>
                <img src={hero} className='bg-auto object-contain' />
            </div>
        </div>
    )
};

export default HeroLayout;