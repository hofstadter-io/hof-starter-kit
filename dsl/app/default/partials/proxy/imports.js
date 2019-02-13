import { _ } from 'lodash';
import request from 'request'
{{#if PROXY.upload}}
import multer from 'multer';
{{/if}}

import Access from '../user/access';
import ServerModule from '../';

import contextMiddleware from './context'
import authMiddleware from './auth'
