import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConstService {
  constructor() {}

  icons = {
    'text/plain': 'text-info fi flaticon-doc',
    dir: 'fi flaticon-folder text-primary',
    'text/html': 'fi flaticon-html text-danger',
    'application/xhtml+xml': 'fi flaticon-html text-danger',
    'text/css': 'fi flaticon-css text-success',
    'application/x-7z-compressed': 'fi flaticon-zip text-warning',
    'application/x-bzip': 'fi flaticon-zip text-warning',
    'application/x-bzip2': 'fi flaticon-zip text-warning',
    'application/zip': 'fi flaticon-zip text-warning',
    'application/x-rar-compressed': 'fi flaticon-zip text-warning',
    'application/x-tar': 'fi flaticon-zip text-warning',
    'application/pdf': 'fi flaticon-pdf text-danger',
    'application/javascript': 'fi flaticon-javascript text-warning',
    'image/vnd.adobe.photoshop': 'fi flaticon-psd text-primary',
    'application/json': 'fi flaticon-json-file text-primary',
    'application/rss+xml': 'fi flaticon-xml',

    'image/jpeg': 'text-warning fi flaticon-jpg',
    'image/x-citrix-jpeg': 'text-warning fi flaticon-jpg',
    'image/x-png': 'fi flaticon-png',
    'image/x-citrix-png': 'fi flaticon-png',
    'image/png': 'fi flaticon-png',

    'audio/x-ms-wax': 'fi flaticon-mp3',
    'audio/x-ms-wma': 'fi flaticon-mp3',
    'audio/x-aac': 'fi flaticon-mp3',
    'audio/x-aiff': 'fi flaticon-mp3',
    'audio/mpeg': 'fi flaticon-mp3',
    'audio/mp4': 'fi flaticon-mp3',
    'audio/webm': 'fi flaticon-mp3',

    'video/mp4': 'fi flaticon-mp4',
    'video/ogg': 'fi flaticon-mp4',
    'video/webm': 'fi flaticon-mp4',
    'video/quicktime': 'fi flaticon-mp4',
    'video/x-sgi-movie': 'fi flaticon-mp4',
    'video/3gpp': 'fi flaticon-mp4',
    'video/x-f4v': 'fi flaticon-mp4',
    'video/x-flv': 'fi flaticon-mp4',
    'video/x-m4v': 'fi flaticon-mp4',
    'video/x-ms-wmv': 'fi flaticon-mp4',
    'video/mpeg': 'fi flaticon-mp4',

    'video/x-msvideo': 'fi flaticon-avi',

    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'fi flaticon-ppt text-danger',
    'application/vnd.openxmlformats-officedocument.presentationml.slide': 'fi flaticon-ppt text-danger',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'fi flaticon-ppt text-danger',
    'application/vnd.openxmlformats-officedocument.presentationml.template': 'fi flaticon-ppt text-danger',
    'application/vnd.ms-powerpoint': 'fi flaticon-ppt text-danger',
    'application/vnd.ms-powerpoint.addin.macroenabled.12': 'fi flaticon-ppt text-danger',
    'application/vnd.ms-powerpoint.presentation.macroenabled.12': 'fi flaticon-ppt text-danger',
    'application/vnd.ms-powerpoint.template.macroenabled.12': 'fi flaticon-ppt text-danger',
    'application/vnd.ms-powerpoint.slideshow.macroenabled.12': 'fi flaticon-ppt text-danger',

    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fi flaticon-xls text-success',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'fi flaticon-xls text-success',

    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fi flaticon-doc text-primary',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'fi flaticon-doc text-primary',
    'application/msword': 'fi flaticon-doc text-primary',
    'application/vnd.ms-word.document.macroenabled.12': 'fi flaticon-doc text-primary',
    'application/vnd.ms-word.template.macroenabled.12': 'fi flaticon-doc text-primary'
  };
}
