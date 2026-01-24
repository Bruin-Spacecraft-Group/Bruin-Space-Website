import { InfiniteSlider } from '@/components/ui/logos/InfiniteSlider'

export default function LogoCloud() {
    return (
        <div className="w-full overflow-hidden py-14 bg-gradient-to-b from-transparent via-black/90 via-15% to-black">
            <div className="relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center gap-10">

                    <div className="text-center group cursor-default select-none">
                        <h3 className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase transition-all duration-500 text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                           Backed By
                        </h3>

                        <div className="h-px w-12 group-hover:w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4 opacity-30 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                    </div>

                    <div className="relative w-full max-w-7xl mx-auto flex items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={25}
                            gap={60} 
                        >

                            <img 
                                src="/partners/lockheed.png" 
                                alt="Lockheed Martin" 
                                className="h-8 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />

                            <img 
                                src="/partners/mathworks.png" 
                                alt="MathWorks" 
                                className="h-8 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />

                            <img 
                                src="/partners/northrop.png" 
                                alt="Northrop Grumman" 
                                className="h-7 md:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />
                            
                            <img 
                                src="/partners/millennium.png" 
                                alt="Millennium Space Systems" 
                                className="h-10 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />

                            <img 
                                src="/partners/ucla.png" 
                                alt="UCLA Samueli" 
                                className="h-9 md:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />
                            
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </div>
    )
}