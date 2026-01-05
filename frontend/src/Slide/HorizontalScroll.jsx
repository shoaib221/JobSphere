

const Story = ({ story }) => {

    return (
        <div className='flex flex-col justify-between px-2 min-w-80 
                        bg-(--color4) hover:bg-(--color4)/80 text-white p-2'  >

            <div className="flex-1 text-justify" >
                {story.comment}
            </div>

            <div className="flex gap-2 items-center" >
                <div  className={`w-18 h-18 rounded-full  bg-cover bg-top`} style={{ backgroundImage: `url(${story.image})` }} />
                <div className="text-sm" >
                    {story.name} <br />
                    {story.profession} 
                    
                </div>
            </div>

        </div>
    )
}

const jobSiteReviews = [
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    
  },
  {
    profession: "Data Analyst",
    comment: "The search and sorting features are excellent. I can easily find data-focused positions by experience level."
  },
  {
    profession: "Product Manager",
    comment: "I like how the platform categorizes jobs clearly, making it simple to track suitable product roles."
  },
  {
    profession: "Fresh Graduate",
    comment: "As a beginner, I found many entry-level jobs and internships that were easy to apply for."
  },
  {
    profession: "HR Specialist",
    comment: "The candidate quality and job posting process are smooth, which helps recruiters save time."
  },
  {
    profession: "Freelance Web Developer",
    comment: "I found both full-time and contract opportunities here, which is great for flexible work options."
  }
];




const stories = [
    {
        name: "Ayesha Rahman",
        image: "https://tse1.mm.bing.net/th/id/OIP.cV42tAwuBoNSAYftNEgzXAHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "Software Engineer",
        comment: "As a software engineer, I have used several job-hunting platforms over the years, but this website stands out because of how well it understands technical roles. The search and filtering system allows me to narrow down jobs based on programming languages, frameworks, experience level, and even remote availability. This saves a lot of time compared to scrolling through irrelevant listings. Another thing I appreciate is the quality of job descriptions."

    },
    {
        name: "Daniel Kim",
        image: "https://tse3.mm.bing.net/th/id/OIP.i4YH9hPP_yM3nXMIQDDkQwHaLL?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "Frontend Developer",
        comment: "From a frontend developer’s perspective, this job-hunting website is both functional and visually pleasing. The layout is clean, well-structured, and easy to navigate, which makes browsing jobs a comfortable experience. I particularly like how filters and sorting options work in real time without page reloads, giving the site a modern feel. Job listings are categorized properly, and the preview cards provide enough information to decide whether to open the full post."

    },
    {
        name: "Maria Gonzalez",
        image: "https://tse1.mm.bing.net/th/id/OIP.4Gt3RAPOCnNj9enH1r6prAHaI-?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "Backend Developer",
        comment: "As a backend developer, I usually focus on job portals that provide clear technical requirements, and this website does exactly that. The job descriptions often include backend technologies, databases, APIs, and system architecture expectations, which helps me evaluate roles effectively. I also like how the platform allows searching by job category and experience level, making it easier to find mid-level or senior positions."

    },
    {
        name: "Joshua Patel",
        image: "https://tse1.explicit.bing.net/th/id/OIP.Ir31nRT7lfY0caGpkbec3gHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "UI/UX Designer",
        comment: "As a UI/UX designer, I naturally pay close attention to how a website looks and feels, and this job-hunting platform delivers a pleasant experience. The spacing, typography, and color choices are well-balanced, making long browsing sessions comfortable. Navigation is intuitive, and important actions like searching, filtering, and applying are easy to locate. From a usability standpoint, the site avoids clutter and unnecessary distractions, which I really appreciate."

    },
    {
        name: "Hana Yamada",
        image: "https://tse1.explicit.bing.net/th/id/OIP.BH6Si47Nt136YsDmFAFuQwHaEx?cb=ucfimg2&ucfimg=1&w=1280&h=824&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "Digital Marketer",
        comment: "This job-hunting website has been very helpful for me as a digital marketer looking for new opportunities. The platform allows me to search for roles related to SEO, content marketing, social media, and performance marketing with ease. I like that job postings often include clear goals, KPIs, and tool requirements, which helps me understand expectations before applying. The filtering options make it easy to focus on marketing-specific roles instead of generic listings."

    },
    {
        name: "Kevin Brown",
        image: "https://tse1.mm.bing.net/th/id/OIP.P3GWxhGR9Y_K7_-4K1fGRQHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        profession: "Data Analyst",
        comment: "As a data analyst, I need job listings that clearly mention data tools, analytics platforms, and problem-solving expectations. This job-hunting website does a good job of presenting that information in a clear and organized way. The search feature allows me to filter roles based on skills like SQL, Python, or data visualization tools, which saves a lot of time. I also appreciate that many job descriptions explain how data will be used within the company, giving insight into real-world impact."

    },
    {
        name: "Fatima Noor",
        image: "https://img.freepik.com/premium-photo/bangladeshi-female-student-black-graduation-gown_606460-87.jpg?w=2000",
        profession: "Product Manager",
        comment: "From a product manager’s point of view, this job-hunting website demonstrates strong product thinking. The core features are well-defined, and the user flow from search to application feels smooth and intentional. Job listings often include responsibilities related to roadmap planning, stakeholder management, and user research, which helps me identify relevant roles quickly. I appreciate the clarity in job descriptions and the ability to sort listings by date, ensuring I see the most recent opportunities first."
    },
    {
        name: "Liam Anderson",
        image: "https://media.istockphoto.com/id/171299141/photo/englishman.jpg?s=1024x1024&w=is&k=20&c=FtS_bl0R7qNDr4ECv4RFDq895gzplUlM1kWA1Rjmk54=",
        profession: "Freelance Web Developer",
        comment: "As a freelance web developer, I value flexibility, and this job-hunting website supports that well. I was able to find both short-term contracts and long-term opportunities without difficulty. Job listings often specify project scope, duration, and expected skills, which helps freelancers decide quickly. The site is easy to navigate, and searching for remote-friendly roles is straightforward. I also like that the platform does not feel cluttered with irrelevant listings."

    }
];


export const ScrollProduct = () => {


    return (

        <div className='flex overflow-auto h-120 gap-2 mx-4' >
            {stories && stories.map((story, index) => <Story key={index} story={story} />)}
        </div>

    )
}


