import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import type { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-newsletter';

interface TemplatePayload {
  templateName: string;
  structure: Record<string, any>;
  compiledHtml: string;
}

type DeviceMode = 'Desktop' | 'Mobile';

const EmailBuilderDemo: React.FC = () => {
  const editorRef = useRef<Editor | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('Desktop');

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs-editor',
      height: '80vh',
      width: '100%',
      fromElement: true,
      plugins: ['gjs-preset-newsletter'],
      storageManager: false,
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' },
          { name: 'Mobile', width: '375px', widthMedia: '480px' }
        ]
      }
    });

    editor.BlockManager.add('custom-button', {
      label: 'Action Button',
      category: 'LMS Components',
      attributes: { class: 'fa fa-link' },
      content: `
        <div style="text-align: center; padding: 20px;">
          <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">
            Click Here
          </a>
        </div>
      `,
    });

    editor.BlockManager.add('custom-header', {
      label: 'Header',
      category: 'LMS Components',
        attributes: { class: 'fa fa-header' },
        content: `
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-family: Arial, sans-serif; color: #333;">Welcome to Our Campaign</h1>
            </div>
        `,
    });

    editor.BlockManager.add('custom-footer', {
      label: 'Footer',
      category: 'LMS Components',
        attributes: { class: 'fa fa-footer' },
        content: `
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                <p style="margin: 0; font-family: Arial, sans-serif; color: #333;">&copy; 2024 Syncglob. All rights reserved.</p>
            </div>
        `,
    });

    editor.BlockManager.add('custom-image', {
      label: 'Image',
      category: 'LMS Components',
        attributes: { class: 'fa fa-image' },
        content: `
            <div style="text-align: center; padding: 20px;">
                <img src="https://via.placeholder.com/600x200" alt="Placeholder Image" style="max-width: 100%; height: auto; border-radius: 5px;" />
            </div>
        `,
    });

    editor.BlockManager.add('custom-divider', {
      label: 'Divider',
      category: 'LMS Components',
      attributes: { class: 'fa fa-minus' },  
      content: `
        <div style="padding: 15px 20px; text-align: center;">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="border-bottom: 2px solid #eaeaea; width: 100%;"></td>
            </tr>
          </table>
        </div>
      `,
    });

    editorRef.current = editor;

    return () => {
      editor.destroy();
    };
  }, []);

  const handleDeviceChange = (mode: DeviceMode): void => {
    setDeviceMode(mode);
    if (editorRef.current) {
      editorRef.current.setDevice(mode);
    }
  };

  const handleSave = (): void => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
     const html = editor.getHtml();
    const css = editor.getCss();
    const finalHTML = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`;

     console.log('=============  HTML =============');
    console.log(finalHTML);
    console.log('===============================================');

     
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 20px', 
        backgroundColor: '#282c34', 
        color: 'white' 
      }}>
        <h3 style={{ margin: 0 }}>LMS Campaign Builder</h3>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleDeviceChange('Desktop')}
            style={{ 
              padding: '8px 15px', cursor: 'pointer', 
              backgroundColor: deviceMode === 'Desktop' ? '#007bff' : '#444', 
              color: 'white', border: 'none', borderRadius: '4px' 
            }}
          >
            Desktop
          </button>
          <button 
            onClick={() => handleDeviceChange('Mobile')}
            style={{ 
              padding: '8px 15px', cursor: 'pointer', 
              backgroundColor: deviceMode === 'Mobile' ? '#007bff' : '#444', 
              color: 'white', border: 'none', borderRadius: '4px' 
            }}
          >
            Mobile
          </button>
          
          <button 
            onClick={handleSave}
            style={{ 
              padding: '8px 15px', cursor: 'pointer', backgroundColor: '#28a745', 
              color: 'white', border: 'none', borderRadius: '4px', marginLeft: '20px', fontWeight: 'bold' 
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div id="gjs-editor"></div>

    </div>
  );
};

export default EmailBuilderDemo;