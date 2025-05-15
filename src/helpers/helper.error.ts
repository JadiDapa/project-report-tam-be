class ErrorHelper {
  static NotFound = (req: any, res: any, message: string) => {
    return res.status(404).json({
      code: 404,
      status: 'error',
      message: message
    });
  };

  static InternalServer = (req: any, res: any, message: string) => {
    return res.status(500).json({
      code: 500,
      status: 'error',
      message: message
    });
  };

  static BadRequest = (req: any, res: any, message: string) => {
    return res.status(400).json({
      code: 400,
      status: 'error',
      message: message
    });
  };

  static Unauthorized = (req: any, res: any, message: string) => {
    return res.status(401).json({
      code: 401,
      status: 'error',
      message: message
    });
  };

  static Forbidden = (req: any, res: any, message: string) => {
    return res.status(403).json({
      code: 403,
      status: 'error',
      message: message
    });
  };
}

export default ErrorHelper;
