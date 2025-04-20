import React from "react";
import PageContainer from "../components/PageContainer"; // Import PageContainer

const About = () => {
  return (
    <PageContainer>
      <div>
        <h1>About Us</h1>
        <section>
          <h2>📚 Bookstore Management System</h2>
          <p>
            Welcome to the Bookstore Management System, a full-stack web application designed to modernize rare book inventory operations. 
            This system supports full CRUD operations, user management, and role-based access control, making it a comprehensive solution for bookstore management.
          </p>
          <p>
            Our platform is built with modern technologies to ensure efficiency and scalability, providing tools for inventory tracking, order management, and analytics.
          </p>
        </section>

        <section>
          <h2>🧰 Technologies Used</h2>
          <ul>
            <li><strong>Backend:</strong> Python, Django, Django REST Framework, PostgreSQL/SQLite, JWT Authentication</li>
            <li><strong>Frontend:</strong> React.js, Axios, HTML, CSS, Bootstrap/TailwindCSS</li>
          </ul>
        </section>

        <section>
          <h2>🧑‍🤝‍🧑 Meet the Team</h2>
          <div>
            <h3>Latherio Kidd</h3>
            <p>
              Latherio is a front-end developer and full-stack lead originally from Monroe, Louisiana, now living in Maryland. 
              With a background in IT and cybersecurity as an Air Force veteran, he focuses on software development and automation. 
              Outside of work, Latherio is a content creator, streamer, and gamer who enjoys building online communities and exploring creative outlets like music and drawing.
            </p>
          </div>
          <div>
            <h3>Johnathan Kavanaugh</h3>
            <p>
              Johnathan is a product owner from Tucson, Arizona, pursuing a bachelor's degree in computer science. 
              He is passionate about art, music, and animals, and dreams of starting a website to sell art made from recycled materials. 
              Johnathan brings a creative perspective to the team and is excited to contribute to the project.
            </p>
          </div>
          <div>
            <h3>Hezekiah Lary</h3>
            <p>
              Hezekiah is a scrum master and QA/testing lead based in California. 
              He is pursuing a computer science degree to advance his career at Northrop Grumman as an engineer. 
              In his free time, Hezekiah enjoys fishing, camping, and spending time with his family.
            </p>
          </div>
          <div>
            <h3>Cody Peterson</h3>
            <p>
              Cody is a product owner with a diverse background, including a Bachelor of Science in Biology and a Master's in Public Health and Epidemiology. 
              After serving in the Air Force, he transitioned to computer science, focusing on cybersecurity. 
              Cody resides in Colorado Springs, CO, with his wife and two dogs, and enjoys exploring the outdoors, gaming, and visiting local breweries.
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default About;