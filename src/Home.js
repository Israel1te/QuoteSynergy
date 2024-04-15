import Content from "./Content";
import img1 from "./img/quote-img1.png";
import img2 from "./img/quote-img2.png";
import React from "react";
const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-container">
          <div className="header">
            <h1 className="header-title">
              Empowering Minds, One Quote at a Time
            </h1>
            <h3 className="header-small-text">
              Where words spark inspiration and fuel your journey to success
            </h3>
          </div>
          <Content title="Quote of the Day" />
        </div>
      </section>
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="grid-2 section-1">
            <div className="benefits-text">
              <h2 className="benefits-header">
                The Benefits of Inspirational Quotes
              </h2>
              <ul>
                <li>
                  <span className="benefits-bold">Mood Elevation</span>
                  Motivational quotes serve as a powerful source of
                  encouragement and positivity, instantly uplifting your mood
                  and perspective. They offer fresh insights, helping you view
                  challenges as opportunities for growth.
                </li>
                <li>
                  <span className="benefits-bold">Empowerment</span> They
                  provide a moment of peace, reducing stress. Importantly, they
                  boost confidence by reminding you of your inner strength and
                  ability to overcome obstacles. motivation, keeping you focused
                  on achieving your goals.
                </li>
              </ul>
            </div>
            <div>
              <div className="benefits-img">
                <img
                  src={img2}
                  alt="a women with her arms out near the ocean"
                />
              </div>
            </div>
          </div>
          <div className="grid-2 section-2">
            <div>
              <div className="benefits-img">
                <img
                  src={img1}
                  alt="a women with her arms out near the ocean"
                />
              </div>
            </div>
            <div className="benefits-text text2">
              <h2 className="benefits-header header2">
                Personalized Quotes Delivered in Moments
              </h2>
              <ul>
                <li>
                  <span className="benefits-bold">Instant Inspiration</span>
                  Experience the convenience of fast and personalized
                  inspiration, with quotes delivered within minutes to ignite
                  your creativity and uplift your spirits.
                </li>
                <li>
                  <span className="benefits-bold">
                    Quotes for Every Mood and Moments
                  </span>{" "}
                  Personalized recommendations tailored to your specific
                  interests and moods, providing a constant source of motivation
                  and encouragement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h1 className="features-header">
            Elevate Your Inspiration and Transform Your Mindset
          </h1>
          <div className="features">
            <div className="feature-card">
              <div className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                  className="icons"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z"></path>
                </svg>

                <h3>Motivational Resources</h3>
              </div>
              <p>
                Explore a vast collection of motivational resources to uplift
                your spirits and drive your ambitions forward.
              </p>
            </div>
            <div className="feature-card">
              <div className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                  className="icons"
                >
                  <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"></path>
                </svg>

                <h3>AI Quote Generator</h3>
              </div>
              <p>
                Experience the power of artificial intelligence in generating
                personalized quotes tailored to your needs and aspirations.
              </p>
            </div>
            <div className="feature-card">
              <div className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"></path>
                </svg>

                <h3>AI Image Generator</h3>
              </div>
              <p>
                Enhance your creativity and productivity with daily AI-generated
                images and quotes, tailored to inspire and keep you on track
                with your objectives.
              </p>
            </div>
            <div className="feature-card">
              <div className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#000000"
                  viewBox="0 0 256 256"
                  className="icons"
                >
                  <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z"></path>
                </svg>
                <h3>Downloadable Content and Social Sharing</h3>
              </div>
              <p>
                Access downloadable content and seamlessly share your favorite
                quotes with friends and followers on social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-section">
        <div className="how-to-container">
          <h2>How to use Quote Generator</h2>
          <div className="flex-3">
            <div className="quote-card">
              <p className="quote-step">Step 1</p>
              <h3>Describe Quote</h3>
              <p className="quote-text">
                Input keywords to reflect your mood or interests, and our AI
                generates personalized quotes to inspire you.
              </p>
            </div>
            <div className="quote-card">
              <p className="quote-step">Step 2</p>
              <h3>Select Preference</h3>
              <p className="quote-text">
                Fine-tune your experience by adjusting the tone of the quotes.
              </p>
            </div>

            <div className="quote-card">
              <p className="quote-step">Step 3</p>
              <h3>Embrace Inpsiration</h3>
              <p className="quote-text">
                Once you've found the perfect quote, share it on social media or
                keep it as a personal mantra to uplift your day. Let the power
                of words inspire you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <details>
            <summary>How does the AI quote generator work?</summary>
            <div className="faq-answer">
              <p>
                Our AI quote generator utilizes advanced algorithms to analyze
                inputted keywords or phrases, understanding the context and
                sentiment behind them. It then searches through a vast database
                of quotes to generate personalized recommendations tailored to
                your specific interests and moods.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Can I request quotes on specific topics or themes?
            </summary>
            <div className="faq-answer">
              <p>
                Absolutely! Our quote generator allows you to describe the type
                of quote you're looking for using keywords or phrases. You can
                also refine your preferences further by adjusting settings such
                as tone, length, and theme.
              </p>
            </div>
          </details>
          <details>
            <summary>Are the quotes generated by the AI original?</summary>
            <div className="faq-answer">
              <p>
                The quotes generated by our AI are curated from a diverse range
                of sources, including literature, speeches, and famous
                individuals. While the AI itself does not create original
                quotes, it selects and presents quotes that best match the
                inputted criteria.
              </p>
            </div>
          </details>
          
          <details>
            <summary>
              Can I share the quotes generated by the AI on social media?
            </summary>
            <div className="faq-answer">
              <p>
                Absolutely! You're welcome to share the quotes generated by our
                AI on your social media platforms to inspire and uplift your
                friends, family, and followers. Simply select the quotes that
                resonate with you and share them with a click of a button.
              </p>
            </div>
          </details>
          <details>
            <summary>Can I provide feedback on the quotes generated?</summary>
            <div className="faq-answer">
              <p>
                Yes, we value your feedback! If you come across a quote that
                particularly resonates with you or if you have suggestions for
                improvement, please feel free to share your thoughts with us.
                Your feedback helps us refine our algorithms and enhance the
                user experience.
              </p>
            </div>
          </details>
          
          <details>
            <summary>
              Is the AI quote generator available on mobile devices?
            </summary>
            <div className="faq-answer">
              <p>
                Yes, our AI quote generator is optimized for mobile devices,
                allowing you to access personalized recommendations wherever you
                go. Simply visit our website using your mobile browser to enjoy
                inspiration on the go.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Is there a cost associated with using the AI quote generator?
            </summary>
            <div className="faq-answer">
              <p>
                No, our AI quote generator is completely free to use. We believe
                in making inspiration accessible to everyone, and our goal is to
                provide a valuable and uplifting experience without any cost
                barrier.
              </p>
            </div>
          </details>
          
        </div>
      </section>
      <footer>
        <p>Copyright © 2024 QuoteSynergy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
