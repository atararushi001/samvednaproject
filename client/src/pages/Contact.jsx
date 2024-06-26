import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    message: "",
  });

  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (sectionRef1.current) {
      observer.observe(sectionRef1.current);
    }

    if (sectionRef2.current) {
      observer.observe(sectionRef2.current);
    }

    if (sectionRef3.current) {
      observer.observe(sectionRef3.current);
    }

    const currentRef1 = sectionRef1.current;
    const currentRef2 = sectionRef2.current;
    const currentRef3 = sectionRef2.current;

    return () => {
      if (currentRef1) {
        observer.unobserve(currentRef1);
      }

      if (currentRef2) {
        observer.unobserve(currentRef2);
      }

      if (currentRef3) {
        observer.unobserve(currentRef3);
      }
    };
  }, []);

  const listItemRef1 = useRef(null);
  const listItemRef2 = useRef(null);
  const listItemRef3 = useRef(null);
  const listItemRef4 = useRef(null);
  const listItemRef5 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (listItemRef1.current) {
      observer.observe(listItemRef1.current);
    }

    if (listItemRef2.current) {
      observer.observe(listItemRef2.current);
    }

    if (listItemRef3.current) {
      observer.observe(listItemRef3.current);
    }

    if (listItemRef4.current) {
      observer.observe(listItemRef4.current);
    }

    if (listItemRef5.current) {
      observer.observe(listItemRef5.current);
    }

    const currentRef1 = listItemRef1.current;
    const currentRef2 = listItemRef2.current;
    const currentRef3 = listItemRef3.current;

    return () => {
      if (currentRef1) {
        observer.unobserve(currentRef1);
      }

      if (currentRef2) {
        observer.unobserve(currentRef2);
      }

      if (currentRef3) {
        observer.unobserve(currentRef3);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API}/utils/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
        message: "",
      });
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="container">
      <section className="address-information to-animate" ref={sectionRef2}>
        <h1>Office Address</h1>
        <div>
          <h3>Address:</h3>
          <p>
            A/173, Silverleaf Bungalows, Near Reavshray Complex, Bh. Bharat
            Petrol Pump, Darshnam Angan lane, Waghodia-Dabhoi Ring Road, Soma
            Talav Crossing, Vadodara - 390025 (Gujarat, India)
          </p>
          <h3>Mobile:</h3>
          <p>9898718766 / 7069766866</p>
          <h3>Email:</h3>
          <p>
            <a href="mailto:hello@mysamvedna.org" className="link">
              hello@mysamvedna.org
            </a>
            <br />
            <a href="mailto:samvedna2010@yahoo.in" className="link">
              samvedna2010@yahoo.in
            </a>
          </p>
        </div>
      </section>

      <section className="contact-form to-animate" ref={sectionRef3}>
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Enter Phone or Mobile No (with country code)"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
          <textarea
            id="address"
            name="address"
            placeholder="Enter Address (with area, city, state, country, and pin code)"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-full" type="submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
