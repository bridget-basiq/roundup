import { useState } from 'react';
import { useFormState } from 'react-use-form-state';
import { axios } from '../../utils/axios';
import { Button } from '../Button';
import { TextField } from '../TextField';
import { ErrorMessage } from '../ErrorMessage';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { StepLogo } from './StepLogo';
import { StepHeading } from './StepHeading';

export function AccountVerificationFormStep0SignUp() {
  const { cancel, goForward, updateAccountVerificationFormState } = useAccountVerificationForm();
  const [formState, { email }] = useFormState();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post('/api/create-user', formState.values)
      .then(res => {
        setSubmitting(false);
        updateAccountVerificationFormState({ user: res.data });
        goForward();
      })
      .catch(error => {
        setSubmitting(false);
        setError(error);
      });
  }

  return (
    <div className="flex flex-col flex-grow space-y-6 sm:space-y-8">
      {/* STEP LOGO */}
      {/* To help the user keep context of what product they're using, */}
      {/* and what bank they're about to connect to. */}
      <StepLogo src="/product-logo-square.svg" alt="Piper logo" />

      <div className="flex flex-col justify-center flex-grow space-y-6 sm:space-y-8">
        {/* STEP HEADING */}
        {/* A short as possible heading to help the user quickly recognise the task at hand. */}
        {/* PRODUCT-COPY: Depending on your product (if you're adding a real user account creation e.g.) */}
        <StepHeading>
          Sign up with your email
          {/* FYI: The hard-coded linebreak (<br>) is purely for decorative purposes.
          Only suitable if the text doesn't wrap in small devices (320px viewport width e.g.) */}
          <br />
          to get started
        </StepHeading>

        {/* CREATE USER FORM */}
        {/* This form is just a fake sign up form, with the purpose of creating a user in Basiq's API 
        (needed to Create Connections). If your app needs to have users, it's a great idea to replace 
        or build out this form, and then use the email address from your app's user to Create User in the API.
        PS. You can also use mobile number to Create User in the API */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 sm:space-y-8">
            {/** Error state */}
            {error && <ErrorMessage message={error.message} />}

            <TextField
              {...email('email')}
              id="email"
              label="Email"
              placeholder="your@email.com"
              disabled={submitting}
              required
            />

            {/* Terms and Conditions */}
            {/* PRODUCT-COPY: Depending on your product (if you're adding a real user account creation e.g.) */}
            <p className="max-w-xs mx-auto text-xs leading-relaxed text-center text-neutral-muted-darker">
              By continuing you agree to the Terms and Conditions and our Privacy Policy.
            </p>

            {/* Actions */}
            <div className="space-y-2">
              <Button type="submit" loading={submitting} variant="bold" block>
                Continue
              </Button>
              <Button type="button" disabled={submitting} variant="subtle" block onClick={cancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
