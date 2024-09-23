import React, { useEffect } from 'react';
import Particles from 'particles.js';

const ParticleComponent = () => {
    useEffect(() => {
        Particles.init({
            selector: '#particles-js',
            maxParticles: 80,
            color: '#ffffff',
            connect: true,
            sizeVariations: 3,
            speed: 1,
            minDistance: 120,
            parallax: true,
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        maxParticles: 50,
                        sizeVariations: 5,
                    },
                },
                {
                    breakpoint: 425,
                    options: {
                        maxParticles: 30,
                        sizeVariations: 3,
                    },
                },
            ],
        });
    }, []);

    return (
        <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
    );
};

export default ParticleComponent;
