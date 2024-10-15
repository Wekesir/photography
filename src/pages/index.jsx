import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg_video from "../assets/photography_bg.mp4";
import "../assets/css/homepage.css";
import { CustomToastContainer, toast } from "../utils/toastUtil";
import { BACKEND_SERVER, BIZ_NAME } from "../constants/constants";
import MainNavbar from "../components/MainNavbar";
import Gallery from "../components/Gallery";
import axios from "axios";
import 'animate.css'
import { WOW } from 'wowjs'

export default function index() {
  const [messageFormInput, setMessageFormInput] = useState({});
  const [subscriptionInfo, setSubscriptionInfo] = useState({});

  const year = new Date().getFullYear();

  const handleSubscription = (e) => {
    setSubscriptionInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitSubscription = async (e) => {
    e.preventDefault();
    const subscriberForm = e.target;
    try {
      subscriberForm.querySelector('button[type="submit"]').disabled = true; //Prevents submitting several times
      subscriberForm
        .querySelector('button[type="submit"] > span.spinner-border')
        .classList.remove("d-none");

      if (Object.keys(subscriptionInfo).length === 0) {
        throw new Error("No data has been provided in the form.");
      }

      const { data } = await axios.post(
        `${BACKEND_SERVER}/guest/subscribe.php`,
        subscriptionInfo
      );

      if (data?.status === 1) {
        toast(data.msg); //Success message
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      toast(`Caught Error: ${error.message}`); //Error message
    } finally {
      setSubscriptionInfo({});
      subscriberForm.querySelector('button[type="submit"]').disabled = false;
      subscriberForm
        .querySelector('button[type="submit"] > span.spinner-border')
        .classList.add("d-none");
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      e.target.querySelector('button[type="submit"]').disabled = true; //Prevents submitting several times
      e.target
        .querySelector('button[type="submit"] > span.spinner-border')
        .classList.remove("d-none");

      if (Object.keys(messageFormInput).length === 0) {
        throw new Error("No data has been provided in the form.");
      }

      const { data } = await axios.post(
        `${BACKEND_SERVER}/guest/sendMessage.php`,
        messageFormInput
      );

      if (data?.status === 1) {
        toast(
          "Your message has been sent successfully! We will contact you shortly."
        );
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      toast(
        `Caught Error: ${error.message}` ||
          "Unknown error trying to send message!"
      );
    } finally {
      setMessageFormInput({});
      e.target.querySelector('button[type="submit"]').disabled = false;
      e.target
        .querySelector('button[type="submit"] > span.spinner-border')
        .classList.add("d-none"); //Hide spinner
    }
  };

  const handleFileInputChange = (e) => {
    setMessageFormInput((prevInput) => {
      return { ...prevInput, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    new WOW().init();
  }, []);

  useEffect(() => {
    document.title = BIZ_NAME;
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid p-0 bg-dark overflow-x-hidden">
        <section>
          <MainNavbar />
        </section>

        <section id="backroundVideo" style={{ position: "relative" }}>
          <video autoPlay loop muted>
            <source src={bg_video} type="video/mp4" />
          </video>
          <div id="textOverlayDiv" className="text-center">
            <p className='wow zoomIn'>
              Welcome to <br />
              Lyrics Studios
            </p>
            <button className="btn btn-primary text-center py-3 px-5 gradient-background fw-bold wow backInUp">
              Get Started
            </button>
          </div>
        </section>

        <section id="services" className="bg-dark">
          <div className="container-fluid py-4">
            <h1 className="text-white text-center fw-bold py-4">
              Our <span className="gradient-text">Services</span>
            </h1>
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="card w-100 bg-dark text-white mb-3 mb-md-0 wow backInLeft">
                  <img
                    src="https://cdn.pixabay.com/photo/2020/03/09/06/18/camera-4914690_640.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ minHeight: "15rem" }}>
                    <h5 className="card-title">Photography</h5>
                    <p className="card-text">
                      Our photography services include portrait, landscape,
                      wedding, family, and corporate photography. From capturing
                      the essence of a person to capturing the beauty of a
                      place, we deliver exceptional results.
                    </p>
                    <Link to="#" className="btn btn-warning btn-md">
                      Get In touch
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card w-100 bg-dark text-white mb-3 mb-md-0 wow backInBottom">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/05/30/08/04/camera-7230748_640.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ minHeight: "15rem" }}>
                    <h5 className="card-title">Videography</h5>
                    <p className="card-text">
                      Our studios also specialize in videography, creating
                      cinematic videos for weddings, events, or promotional
                      purposes. From capturing the essence of a person to
                      capturing the beauty of a place, we deliver exceptional
                      results.
                    </p>
                    <Link to="#" className="btn btn-warning btn-md">
                      Get In touch
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card w-100 bg-dark text-white mb-3 mb-md-0 wow backInTop">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/06/22/35/retouch-1241322_640.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ minHeight: "15rem" }}>
                    <h5 className="card-title">Editing & Retouching</h5>
                    <p className="card-text">
                      Professional editing ensures your photos look their best,
                      with color correction, retouching, and enhancements to
                      enhance your images. We're here to help you create the
                      perfect shot.
                    </p>
                    <Link to="#" className="btn btn-warning btn-md">
                      Get In touch
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card w-100 bg-dark text-white mb-3 mb-md-0 wow backInRight">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/12/24/21/14/portrait-7676482_640.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ minHeight: "15rem" }}>
                    <h5 className="card-title">Passport Photos</h5>
                    <p className="card-text">
                      Studios offer passport and visa photos that meet official
                      requirements. We ensure that your passport photos are of
                      high quality and meet official requirements.
                    </p>
                    <Link to="#" className="btn btn-warning btn-md">
                      Get In touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-light">
          <div className="container-fluid content-wrapper">
            <h1 className="text-center py-4 text-white wow shakeX">
              <span className="gradient-text">Contact</span> Us
            </h1>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <div
                  id="socials"
                  style={{
                    backgroundColor: "rgba(255,255,255,.1)",
                    height: "100%",
                  }}
                >
                  <ul className="list-group gy-3">
                    <Link
                      to="#"
                      className="list-group-item list-group-item-action text-white border-0 d-flex align-items-center wow jello"
                      style={{
                        backgroundColor: "rgba(0,0,0,0)",
                        fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                        padding: "10px 15px",
                      }}
                    >
                      <span className="icon-wrapper me-3 border border-light rounded-circle py-2 px-3">
                        <i className="bi bi-telephone"></i>
                      </span>
                      +(254)711616621
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item list-group-item-action text-white border-0 d-flex align-items-center  wow jello"
                      style={{
                        backgroundColor: "rgba(0,0,0,0)",
                        fontSize: "clamp(1rem, 3vw, 1.5rem)",
                        padding: "10px 15px",
                      }}
                    >
                      <span className="icon-wrapper me-3 border border-light rounded-circle py-2 px-3">
                        <i className="bi bi-envelope"></i>
                      </span>
                      lyricsphotography@gmail.com
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item list-group-item-action text-white border-0 d-flex align-items-center wow jello"
                      style={{
                        backgroundColor: "rgba(0,0,0,0)",
                        fontSize: "clamp(1rem, 3vw, 1.5rem)",
                        padding: "10px 15px",
                      }}
                    >
                      <span className="icon-wrapper me-3 border border-light rounded-circle py-2 px-3">
                        <i className="bi bi-geo-alt-fill text-white"></i>
                      </span>
                      Jodan House, Thika.
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-2">
                <form
                  action=""
                  className="py-3 px-5 wow heartBeat"
                  onSubmit={handleSubmitMessage}
                  method="post"
                  style={{ backgroundColor: "rgba(255,255,255,.1)" }}
                >
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label text-white fw-bold"
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      onChange={handleFileInputChange}
                      value={messageFormInput.name || ""}
                      name="name"
                      className="form-control text-white bg-dark bg-opacity-75 border border-secondary"
                      id="name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label text-white fw-bold"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      onChange={handleFileInputChange}
                      value={messageFormInput.email || ""}
                      name="email"
                      className="form-control text-white bg-dark bg-opacity-75 border border-secondary"
                      id="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="message"
                      className="form-label text-white fw-bold"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      onChange={handleFileInputChange}
                      name="msg"
                      value={messageFormInput.msg || ""}
                      className="form-control text-white bg-dark bg-opacity-75 border border-secondary"
                      id="message"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 gradient-background text-white fw-bold"
                  >
                    <span
                      className="spinner-border spinner-border-sm d-none"
                      aria-hidden="true"
                    ></span>{" "}
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-12">
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.167185446997!2d37.07290697372606!3d-1.0351480354006124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4feacfbaf82f%3A0xafc57d3580d261f0!2sJodan%20College%20Of%20Technology-Main%20Campus!5e0!3m2!1sen!2ske!4v1723388554420!5m2!1sen!2ske"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-dark">
          <Gallery />
        </section>

        <section id="footer" className="bg-black">
          <div className="container-fluid p-4">
            <div className="row g-3">
              <div className="col-12 col-md-3">
                <h5 className="text-white fw-bold">LYRICS STUDIOS</h5>{" "}
                <hr className="border border-secondary" />
                <p style={{ color: "rgba(255,255,255,.9)" }}>
                  Lyrics Studios is more than just a photography studio—it’s
                  where moments come alive. Our lens captures the poetry in
                  everyday life, turning it into visual symphonies. From
                  weddings to corporate events, family portraits to cinematic
                  videos, we blend artistry with technology. With Lyrics
                  Studios, your memories become timeless melodie!
                </p>
              </div>
              <div className="col-12 col-md-3">
                <h5 className="text-white fw-bold">QUICK ACCESS</h5>{" "}
                <hr className="border border-secondary" />
                <p
                  className="text-white"
                  style={{ color: "rgba(255,255,255,.9)" }}
                >
                  Get in touch with us through our various social media
                  plaforms. For the best photography services today!
                </p>
              </div>
              <div className="col-12 col-md-3">
                <h5 className="text-white fw-bold">FOLLOW US</h5>{" "}
                <hr className="border border-secondary" />
                <ul
                  className="list-group gy-3"
                  style={{ color: "rgba(255,255,255,.9)" }}
                >
                  <Link
                    to="https://www.facebook.com/lyrics.lyrics.526"
                    className="list-group-item list-group-item-action bg-black text-white border-0"
                    target="_blank"
                  >
                    <i className="bi bi-facebook text-white me-2"></i> Facebook
                  </Link>
                  <Link
                    to="https://www.instagram.com/lyrics_photography.254/?hl=en"
                    className="list-group-item list-group-item-action bg-black text-white border-0"
                    target="_blank"
                  >
                    <i className="bi bi-instagram text-white me-2"></i>{" "}
                    Instagram
                  </Link>
                  <Link
                    to="#"
                    className="list-group-item list-group-item-action bg-black text-white border-0"
                  >
                    <i className="bi bi-twitter-x me-2"></i> X
                  </Link>
                  <Link
                    to="#"
                    className="list-group-item list-group-item-action bg-black text-white border-0"
                  >
                    <i className="bi bi-youtube me-2"></i> YouTube
                  </Link>
                </ul>
              </div>
              <div className="col-12 col-md-3">
                <h5 className="fw-bold text-white">SUBSCRIPTIONS</h5>{" "}
                <hr className="border border-secondary" />
                <form onSubmit={handleSubmitSubscription}>
                  <input
                    type="email"
                    name="email"
                    onChange={handleSubscription}
                    value={subscriptionInfo.email || ""}
                    className="form-control mb-2 bg-transparent text-white border border-secondary"
                    placeholder="Your Email Address"
                  />
                  <button type="submit" className="btn btn-primary px-5">
                    <span
                      className="spinner-border spinner-border-sm d-none"
                      aria-hidden="true"
                    ></span>{" "}
                    Subscribe
                  </button>
                </form>
                <p
                  className="text-white"
                  style={{ color: "rgba(255,255,255,.9)" }}
                >
                  Get exclusive content, updates, and special offers.
                </p>
                <p className="text-center">
                  <Link to="/terms-conditions" className="text-secondary link-offset-3">Terms & Conditions</Link> |{" "}
                  <Link to="/privacy-policy" className="text-secondary link-offset-3">Privacy Policy</Link>
                </p>
              </div>
              <div className="col-12">
                <div className="container text-center">
                  <h6 className="text-white">
                    {year} Lyrics Studios. All rights reserved.
                  </h6>
                  <small className="text-white wow flash">
                    Software by: Wekesir Ken(+254)710595755
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CustomToastContainer />
    </React.Fragment>
  );
}
