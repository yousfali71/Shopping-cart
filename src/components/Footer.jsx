import "../components/CSS/Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <p className="footer-h3">Find Us:</p>
        <p>123 Gomhorya-street</p>
        <p>Portsaid,Egypt</p>
        <p>(123)-456-7890</p>
        <p>support@superawesomestore.com</p>
      </div>
      <div className="footer-center">
        <p className="footer-h3">Links:</p>
        <ul>
          <li>
            <a href="">Jobs & Careers</a>
          </li>
          <li>
            <a href="">Policies</a>
          </li>{" "}
          <li>
            <a href="">Reviews</a>
          </li>
        </ul>
      </div>
      <div className="footer-right">
        {" "}
        <p className="footer-h3">About Us:</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          ullam culpa esse assumenda rem architecto? Excepturi possimus
          architecto, assumenda, labore voluptatibus delectus minus ipsam
          veritatis esse omnis placeat alias repellendus?
        </p>
      </div>
    </div>
  );
}
