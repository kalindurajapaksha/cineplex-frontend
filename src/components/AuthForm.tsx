import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import {
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";

const AuthForm = () => {
  const submit = useSubmit();
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const isSubmitting = navigation.state === "submitting";
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    if (!isLogin) {
      formData.append("firstName", e.target.firstName.value);
      formData.append("lastName", e.target.lastName.value);
    }
    e.preventDefault();
    submit(formData, { method: "post" });
  };
  return (
    <Row lg={2} xs={1} className="justify-content-center">
      <Card className="p-4 py-5 mt-5">
        <Form onSubmit={submitHandler}>
          {!isLogin && (
            <Form.Group className="mb-2">
              <Form.Label>First name</Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                placeholder="Enter first name"
              />
            </Form.Group>
          )}
          {!isLogin && (
            <Form.Group className="mb-2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                id="lastName"
                type="text"
                placeholder="Enter last name"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control id="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Row>
            <Col xs={12}>
              <Stack direction="horizontal" className="mt-2">
                <p className="m-0">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link
                  style={{ textDecoration: "none", marginLeft: "5px" }}
                  to={`?mode=${isLogin ? "signup" : "login"}`}
                >
                  {isLogin ? "Create an account" : "Login"}
                </Link>
              </Stack>
            </Col>
            <Col className="d-flex justify-content-end ">
              <Button type="submit" className="px-4" disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : isLogin
                  ? "Login"
                  : "Create account"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  );
};

export default AuthForm;
