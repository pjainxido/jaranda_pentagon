const colors = {
  green: '#87bf44',
  lightgreen: '#dcf2b5',
  blue: '#0085fd',
  red: '#f8666a',
};

const common = {
  button: `
  border: none;
  box-shadow: none;
  cursor: pointer;
  border-radius: 5px;
  `,
  input: `  
  border: 1px solid rgba(154, 154, 154, 0.5);
  border-radius: 5px;
  :focus {
    outline: none;
  }`,
};

const size = {
  tablet: '1023px',
};

const height = {
  component: '200px',
};

const theme = {
  colors,
  common,
  height,
  tablet: `(max-width: ${size.tablet})`,
};

export default theme;
