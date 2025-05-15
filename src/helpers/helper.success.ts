class SuccessHelper {
  static OK = (req: any, res: any, message: string) => {
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: message
    });
  };

  static DataFound = (req: any, res: any, message: string, data: any) => {
    return res.status(200).json({
      code: 200,
      status: 'success',
      message: message,
      data: data
    });
  };

  static Created = (req: any, res: any, message: string, data: any) => {
    return res.status(201).json({
      code: 201,
      status: 'success',
      message: message,
      data: data
    });
  };
}

export default SuccessHelper;
