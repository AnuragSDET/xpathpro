'use client';

import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  gender: 'male' | 'female';
}

const testimonials: Testimonial[] = [
  { id: 3, name: "John Kim", text: "The personalized attention and hands-on training gave me the confidence to ace interviews and land my first SDET job within three months.", gender: "male" },
  { id: 4, name: "Riya Gupta", text: "The mentors make even complex topics feel simple. I now work as a QA Automation Engineer at a leading fintech startup. Thank you, xPath.pro!", gender: "female" },
  { id: 5, name: "Daniel Wu", text: "I had zero tech experience but was hired as an SDET before the program even ended. The job application support is a game-changer!", gender: "male" },
  { id: 6, name: "Maria Petrova", text: "I loved the supportive environment. From daily lessons to real projects, everything was geared toward helping me succeed in tech.", gender: "female" },
  { id: 7, name: "Rajiv Nair", text: "Moving from retail to IT seemed impossible. xPath.pro's mentorship proved otherwise—the interview prep was just outstanding.", gender: "male" },
  { id: 8, name: "Elena Popova", text: "I was a stay-at-home mom and worried about learning coding. The flexible online sessions helped me land a remote QA job.", gender: "female" },
  { id: 9, name: "Hakim Ozturk", text: "The program structure, expert mentors, and community spirit make xPath.pro stand out. Now, I'm proud to call myself a software tester!", gender: "male" },
  { id: 10, name: "Saanvi Mehra", text: "I used to struggle with online tutorials. xPath.pro provided structured learning, constant feedback, and real job leads.", gender: "female" },
  { id: 11, name: "Arun Patel", text: "The job application and resume workshops made a huge difference. I got multiple interview calls and now work for a US-based company.", gender: "male" },
  { id: 12, name: "Julia Anderson", text: "I transitioned from admin work to automation engineering thanks to practical mentorship that focused on real-world skills.", gender: "female" },
  { id: 13, name: "Faisal Rahman", text: "The course was intensive but flexible. I managed to upskill while working full-time and landed an SDET job in Europe.", gender: "male" },
  { id: 14, name: "Sneha Das", text: "I loved the 1-on-1 support. Any doubt I had was solved immediately. The program is perfect for absolute beginners.", gender: "female" },
  { id: 15, name: "Victor Santos", text: "From factory work to IT, xPath.pro made what seemed impossible, possible. I appreciate their dedication and commitment.", gender: "male" },
  { id: 16, name: "Sarah Lee", text: "I failed my first interview, but with more mock sessions and encouragement, I soon got an offer. The mentors never give up on you.", gender: "female" },
  { id: 17, name: "Aditya Iyer", text: "All the projects and guidance were practical, not just theory. I was ready for real interviews and real work!", gender: "male" },
  { id: 18, name: "Anya Soboleva", text: "The sense of community at xPath.pro pushed me to excel. I found guidance, support, and lifelong friends.", gender: "female" },
  { id: 19, name: "Marcus Johnson", text: "Being from a non-IT background, the transition was smooth. The structured modules built up my confidence and knowledge.", gender: "male" },
  { id: 20, name: "Aditi Ghosh", text: "The support didn't stop after graduation. I got help with salary negotiations and onboarding at my new company. Highly recommended!", gender: "female" }
];

const getAvatarUrl = (name: string, gender: 'male' | 'female') => {
  const seed = name.replace(/\s+/g, '').toLowerCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=48&background=random&color=fff&rounded=true&bold=true`;
};

const TestimonialCard = ({ testimonial, isHovered, onHover, onLeave }: {
  testimonial: Testimonial;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <div
    className={`relative flex-shrink-0 w-96 h-60 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-500 overflow-hidden ${
      isHovered ? 'scale-105 shadow-cyan-500/25' : ''
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {/* Glow effect */}
    <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur transition-opacity duration-500 ${
      isHovered ? 'opacity-100' : 'opacity-0'
    }`} />
    
    <div className="relative z-10 h-full flex flex-col">
      {/* Quote Section */}
      <div className="flex-1 mb-4">
        <div className="text-cyan-400 text-xl mb-3">"</div>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
          {testimonial.text}
        </p>
      </div>
      
      {/* Bottom Section with Avatar and Signature */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <img
          src={getAvatarUrl(testimonial.name, testimonial.gender)}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full border-2 border-white/20"
        />
        <div className="flex-1 flex justify-end pr-2">
          <div 
            className="text-white/80 font-signature text-base transform rotate-[-2deg] max-w-32 truncate"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            {testimonial.name}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const firstRow = testimonials.slice(0, 9);
  const secondRow = testimonials.slice(9, 18);

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
          SUCCESS STORIES
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Real transformations from our community of SDET professionals
        </p>
      </div>

      {/* First row - Right to Left */}
      <div className="relative mb-8">
        <div className="flex space-x-6 animate-scroll-right">
          {[...firstRow, ...firstRow].map((testimonial, index) => (
            <TestimonialCard
              key={`row1-${testimonial.id}-${index}`}
              testimonial={testimonial}
              isHovered={hoveredCard === `row1-${testimonial.id}-${index}`}
              onHover={() => setHoveredCard(`row1-${testimonial.id}-${index}`)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>

      {/* Second row - Left to Right */}
      <div className="relative">
        <div className="flex space-x-6 animate-scroll-left">
          {[...secondRow, ...secondRow].map((testimonial, index) => (
            <TestimonialCard
              key={`row2-${testimonial.id}-${index}`}
              testimonial={testimonial}
              isHovered={hoveredCard === `row2-${testimonial.id}-${index}`}
              onHover={() => setHoveredCard(`row2-${testimonial.id}-${index}`)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}