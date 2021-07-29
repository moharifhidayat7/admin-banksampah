export default function errorHanlder(error, req, res, next) {
  console.log(error);
  return next();
}
