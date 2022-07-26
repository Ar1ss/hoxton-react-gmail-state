import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";
import { useState } from "react";

type email = {
  id: number;
  sender: string;
  title: string;
  starred: boolean;
  read: boolean;
}

function toggleEmailStarred(email: email) {
  return {
    ...email,
    starred: !email.starred
  }
}

function toogleEmailRead(email: email) {
  return {
    ...email,
    read: !email.read
  }
}


function App() {
  const [emails, setEmails] = useState(initialEmails);
  console.log(initialEmails);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              setEmails(initialEmails);
            }
            }
          >
            <span className="label">Inbox</span>
            <span className="count">
              {emails.filter(email => !email.read).length}
            </span>
          </li>
          <li
            className="item"
            onClick={() => {
              setEmails(
                emails.map(email =>
                  email.starred ? toggleEmailStarred(email) : email
                )
              );
            }
            }
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter(email => email.starred).length}
            </span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => {
                setEmails(emails.filter(email => !email.read))
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        emails.map(email => (
          <li className="emails-list">
            <div className="email-item">


                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={() => {
                    setEmails(
                      emails.map(email =>(email.id === email.id ? toogleEmailRead(email) : email))

                    )
                  }
                  }
                
                />



            </div>
                <div className="email-item-starred">
                  <input
                    type="checkbox"
                    checked={email.starred}
                    onChange={() => {
                      setEmails(
                        emails.map(email =>
                          email.id === email.id ? toggleEmailStarred(email) : email
                        )
                      );
                    }
                    }
                  />
                </div>
                <div className="email-item-from">{email.sender}</div>
                <div className="email-item-subject">{email.title}
                </div>
             
          </li>
        ))
      }
      </main>
    </div>

  );
}

export default App;
