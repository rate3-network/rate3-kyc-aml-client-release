/* This component renders a 'dropzone' for file uploads
 * Usage:
  import RenderFileInput from '../../forms/RenderFileInput';
  // Component to render
  <div className={s.field}>
    <label htmlFor={'file'}>Files</label>
    <Field
      name={'file'}
      component={RenderFileInput}
    />
  </div>

  // Function for handling submit
  // Note, important that is of FormData type, not application/json
  submit = (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    const url = ''; // ENTER YOUR URL HERE
    fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    });
  }
  .
  .
  // Then in your form render,
  <form onSubmit={this.submit.bind(this)} />

*/

import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames/bind';

import s from './styles.css';

import FieldError from '../FieldError';

const cx = classNames.bind(s);

/**
 * Render File Input component to be wrapped by Redux Form.
 *
 * This component implements file input using React-Dropzone.
 * See https://react-dropzone.netlify.com/ for accepted props.
 *
 * @param {*} props
 */
const RenderFileInput = (props) => {
  const {
    // Redux form props
    meta,
    input,
    // Props for <input /> tag
    id,
    // Props to pass into React Dropzone
    ...restProps
  } = props;

  const files = input.value;

  const hasFiles = files && Array.isArray(files) && files.length > 0;
  const hasError = meta.touched && !meta.active && meta.invalid;
  const isValid = hasFiles && !hasError;

  const renderPlaceholderImage = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 41" version="1.1">
      <path
        fill="#818CA1"
        d="M 51.7021 41L 37.4257 41C 36.7533 41 36.2076 40.4508 36.2076 39.7741L 36.2076 30.0556C 36.2076 29.3789 36.7533 28.8297 37.4257 28.8297L 40.9997 28.8297L 32.6864 20.4636L 24.3731 28.8297L 27.9479 28.8297C 28.6211 28.8297 29.166 29.3789 29.166 30.0556L 29.166 39.7741C 29.166 40.4508 28.6211 41 27.9479 41L 13.2979 41C 5.96557 41 0 34.9966 0 27.6177C 0 20.2389 5.96557 14.2355 13.2979 14.2355C 13.6389 14.2355 13.9898 14.2518 14.3536 14.2845C 17.0205 5.822 24.8563 1.74581e-07 33.7705 1.74581e-07C 42.6791 1.74581e-07 50.5465 5.85142 53.1996 14.3352C 59.8839 15.0854 65 20.7578 65 27.6177C 65 34.9966 59.0344 41 51.7021 41ZM 38.6438 38.5483L 51.7021 38.5483C 57.6912 38.5483 62.5637 33.6449 62.5637 27.6177C 62.5637 21.7737 58.0153 16.9838 52.2089 16.7141C 51.6794 16.6904 51.2262 16.3227 51.089 15.8078C 48.9906 7.94437 41.8686 2.45171 33.7705 2.45171C 25.605 2.45171 18.4676 7.99831 16.4138 15.941C 16.2555 16.5523 15.661 16.9454 15.0406 16.8425C 14.3999 16.7387 13.8298 16.688 13.2979 16.688C 7.30875 16.6872 2.43625 21.5906 2.43625 27.6177C 2.43625 33.6449 7.30875 38.5483 13.2979 38.5483L 26.7297 38.5483L 26.7297 31.2814L 21.4325 31.2814C 20.9396 31.2814 20.4954 30.9831 20.307 30.5246C 20.1186 30.0662 20.2225 29.5391 20.5709 29.1885L 31.8248 17.8632C 32.3006 17.3843 33.0713 17.3843 33.5472 17.8632L 44.801 29.1885C 45.1494 29.5391 45.2542 30.0662 45.065 30.5246C 44.8757 30.9831 44.4324 31.2814 43.9394 31.2814L 38.643 31.2814L 38.643 38.5483L 38.6438 38.5483Z"
      />
    </svg>
  );

  const renderPlaceholder = () => (
    <div className={s.placeholderContainer}>
      <div className={s.placeholderImage}>
          {renderPlaceholderImage()}
      </div>
      <div className={s.description}>Choose a file or drag in here.</div>
      <div className={s.info}>
        <div>Format: JPEG or PNG</div>
        <div>Size: 10 KB &#8211; 2 MB</div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className={s.previewContainer}>
      {hasFiles && files.map((file, i) => (
        <React.Fragment key={i}>
          <img className={s.uploadedImage} src={file.preview} alt={`${file.name}_preview`} />
          <div className={s.uploadedImageFileName}>{file.name}</div>
        </React.Fragment>
      ))}
    </div>
  );

  const clickRemoveFileButton = () => input.onChange([]);

  const renderRemoveFileButton = () => (
    <span className={s.removeFileButton} onClick={clickRemoveFileButton}>&times;</span>
  );

  // Apply additional styling if error or valid to wrapping div
  const wrapperClassName = cx(
    s.errorWrapper,
    (hasError && s.invalid) || (isValid && s.valid),
  );

  // Apply additional styling if error or valid to result text div
  const resultClassName = cx(
    s.result,
    (hasError && s.invalid) || (isValid && s.valid)
  );

  return (
    <div>
      <div className={wrapperClassName}>
        <Dropzone
          className={s.dropzone}
          onDrop={(filesToUpload, e) => { input.onChange(filesToUpload); }}
          onDropAccepted={() => input.onBlur()} // Trigger meta.touched for redux-form
          onDropRejected={() => input.onBlur()} // Trigger meta.touched for redux-form
          onClick ={() => input.onBlur()} // Trigger meta.touched for redux-form
          inputProps={{ id }}
          {...restProps}
        >
          {hasFiles ? renderPreview() : renderPlaceholder()}
        </Dropzone>
        {hasFiles && renderRemoveFileButton()}
      </div>
      <div className={resultClassName}>
        {
          (hasError && meta.error) ||
          (isValid && 'File successfully uploaded') ||
          (<React.Fragment>&nbsp;</React.Fragment>)
        }
      </div>
    </div>
  );
};

export default RenderFileInput;