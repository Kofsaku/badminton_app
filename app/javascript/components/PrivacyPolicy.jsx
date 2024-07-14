import React from 'react';
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

const PrivacyPolicy = () => {
  const paragraphs = [
    "Lorem ipsum dolor sit amet consectetur. At viverra massa pharetra id hac. Gravida pharetra tortor consectetur laoreet etiam porttitor. Facilisis mauris sociis enim facilisis vestibulum viverra. Proin cras id nibh vel pellentesque imperdiet at diam ac. Pellentesque gravida quis at mattis arcu vitae et placerat enim. A risus enim sed in. Enim pellentesque ultricies in mattis sit. Aenean in condimentum pretium pretium sed pharetra. Massa viverra felis hac ut sodales. Placerat elementum vestibulum felis orci non tristique rutrum. Lectus blandit habitasse vivamus nibh at dictumst non purus quisque. Quis amet cras viverra faucibus elementum. Commodo nunc malesuada adipiscing vitae faucibus libero erat.",
    "Lorem ipsum dolor sit amet consectetur. At viverra massa pharetra id hac. Gravida pharetra tortor consectetur laoreet etiam porttitor. Facilisis mauris sociis enim facilisis vestibulum viverra. Proin cras id nibh vel pellentesque imperdiet at diam ac. Pellentesque gravida quis at mattis arcu vitae et placerat enim. A risus enim sed in. Enim pellentesque ultricies in mattis sit. Aenean in condimentum pretium pretium sed pharetra. Massa viverra felis hac ut sodales. Placerat elementum vestibulum felis orci non tristique rutrum. Lectus blandit habitasse vivamus nibh at dictumst non purus quisque. Quis amet cras viverra faucibus elementum. Commodo nunc malesuada adipiscing vitae faucibus libero erat.",
    "Lorem ipsum dolor sit amet consectetur. At viverra massa pharetra id hac. Gravida pharetra tortor consectetur laoreet etiam porttitor. Facilisis mauris sociis enim facilisis vestibulum viverra. Proin cras id nibh vel pellentesque imperdiet at diam ac. Pellentesque gravida quis at mattis arcu vitae et placerat enim. A risus enim sed in. Enim pellentesque ultricies in mattis sit. Aenean in condimentum pretium pretium sed pharetra. Massa viverra felis hac ut sodales. Placerat elementum vestibulum felis orci non tristique rutrum. Lectus blandit habitasse vivamus nibh at dictumst non purus quisque. Quis amet cras viverra faucibus elementum. Commodo nunc malesuada adipiscing vitae faucibus libero erat.",
    "Lorem ipsum dolor sit amet consectetur. At viverra massa pharetra id hac. Gravida pharetra tortor consectetur laoreet etiam porttitor. Facilisis mauris sociis enim facilisis vestibulum viverra. Proin cras id nibh vel pellentesque imperdiet at diam ac. Pellentesque gravida quis at mattis arcu vitae et placerat enim. A risus enim sed in. Enim pellentesque ultricies in mattis sit. Aenean in condimentum pretium pretium sed pharetra. Massa viverra felis hac ut sodales. Placerat elementum vestibulum felis orci non tristique rutrum. Lectus blandit habitasse vivamus nibh at dictumst non purus quisque. Quis amet cras viverra faucibus elementum. Commodo nunc malesuada adipiscing vitae faucibus libero erat.",
    "Lorem ipsum dolor sit amet consectetur. At viverra massa pharetra id hac. Gravida pharetra tortor consectetur laoreet etiam porttitor. Facilisis mauris sociis enim facilisis vestibulum viverra. Proin cras id nibh vel pellentesque imperdiet at diam ac. Pellentesque gravida quis at mattis arcu vitae et placerat enim. A risus enim sed in. Enim pellentesque ultricies in mattis sit. Aenean in condimentum pretium pretium sed pharetra. Massa viverra felis hac ut sodales. Placerat elementum vestibulum felis orci non tristique rutrum. Lectus blandit habitasse vivamus nibh at dictumst non purus quisque. Quis amet cras viverra faucibus elementum. Commodo nunc malesuada adipiscing vitae faucibus libero erat."
  ];

  return (
    <div>
      <Header />
      <section className="py-5 my-2">
        <div className="container">
          <div className="d-block w-100 text-center">
            <h3 className="text-green3 mt-0 mb-2 text-32 fw-bold">Privacy Policy</h3>
          </div>
        </div>
      </section>
      {/* Page Title Ends Here */}
      {/* Page Content Starts Here */}
      <section className="pb-5">
        <div className="container">
          <div className="d-block w-100">
            <div className="d-block">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-16 mt-0 mb-3 text-green3 lh-normal">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
