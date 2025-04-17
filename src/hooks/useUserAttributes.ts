import { useState, useEffect } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

export const useUserAttributes = () => {
  const [attributes, setAttributes] = useState<{
    email?: string;
    sub?: string;
    [key: string]: string | undefined;
  }>();

  useEffect(() => {
    fetchUserAttributes().then(setAttributes);
  }, []);

  return attributes;
};
