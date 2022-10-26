import { useState, useEffect } from "react";
import { Container } from "react-bootstrap"
import UserModel from "../../Models/user-model"
import { authStore } from "../../Redux/Store";

export const UserProfile = () => {

      const [user, setUser] = useState<UserModel>();
      useEffect(() => {
            setUser(authStore.getState().user);

      })

      return (
            <Container>
                  {!user &&
                        <>
                              <p>Hello guest</p>
                        </>
                  }
                  {user &&
                        <>
                              <p>Hello {user?.firstName + " " + user?.lastName}</p>
                        </>
                  }
            </Container>
      )
}