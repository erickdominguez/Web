import renderer from 'react-test-renderer';
import LoginForm from '../UI/atoms/LoginForm';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <LoginForm></LoginForm>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  renderer.act(() => {
    tree.props.submitForm({
        email: 'mariel@gmail.com',
        password: '123',
      });
  });
});