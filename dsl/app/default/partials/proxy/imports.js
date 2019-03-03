import { _ } from 'lodash';
import request from 'request'
import bodyParser from 'body-parser';
{{#if PROXY.upload}}
import multer from 'multer';
{{/if}}

import Access from '../user/access';
import ServerModule from '../';

import contextMiddleware from './context'
import authMiddleware from './auth'
