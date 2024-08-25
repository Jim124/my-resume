'use server';

import Template from '@/models/templateModel';

import { connectMongoDB } from '@/config/db';
import { revalidatePath } from 'next/cache';

export interface ITemplate {
  _id: string;
  name: string;
  html: string;
  isOnlyForSubscribers: boolean;
  thumbnail: string;
}

connectMongoDB();

export const createTemplate = async (data: any) => {
  try {
    await Template.create(data);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'created template successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to create template',
    };
  }
};

export const getAllTemplates = async () => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(templates)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to get templates',
    };
  }
};

export const getTemplateById = async (id: string) => {
  try {
    const template = await Template.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(template)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to get templates',
    };
  }
};

export const updateTemplateById = async (id: string, data: any) => {
  try {
    await Template.findByIdAndUpdate(id, data);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'updated template successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to update template',
    };
  }
};

export const deleteTemplateById = async (id: string) => {
  try {
    await Template.findByIdAndDelete(id);
    revalidatePath('/admin/templates');
    return {
      success: true,
      message: 'deleted template successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'failed to delete template',
    };
  }
};
