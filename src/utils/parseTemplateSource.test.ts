import { describe, it, expect } from 'vitest';
import { parseTemplateSource } from './parseTemplateSource';

describe('parseTemplateSource', () => {
  describe('should parse local file paths correctly', () => {
    // Test cases for local file paths
    // Example: file:./template
    // Example: ./template
    // Example: ../template
    // Example: /template
    // Example: C:\template (Windows)
    // const fileTemplate = 'file:./template';
    // const result = parseTemplateSource(fileTemplate);
    // expect(result.repoUrl).toBe('/absolute/path/to/template'); // Adjust based on your environment
  });

  describe('should parse GitHub URLs correctly', () => {
    it('should parse GitHub URLs correctly: user/repo', () => {
      // Test cases for GitHub URLs
      // Example: user/repo
      // Example: user/repo#branch
      // Example: user/repo/subdir
      // Example: user/repo#branch/subdir
      const githubUrl = 'user/repo';
      const result = parseTemplateSource(githubUrl);
      expect(result.repoUrl).toBe('https://github.com/user/repo.git');
      expect(result.ref).toBe('');
      expect(result.subdir).toBe('');
      expect(result.isGithub).toBe(true);
    });
    it('should parse GitHub URLs with branch: user/repo#branch', () => {
      const githubUrl = 'user/repo#branch';
      const result = parseTemplateSource(githubUrl);
      expect(result.repoUrl).toBe('https://github.com/user/repo.git');
      expect(result.ref).toBe('branch');
      expect(result.subdir).toBe('');
      expect(result.isGithub).toBe(true);
    });
    it('should parse GitHub URLs with subdir: user/repo/subdir', () => {
      const githubUrl = 'user/repo/subdir';
      const result = parseTemplateSource(githubUrl);
      expect(result.repoUrl).toBe('https://github.com/user/repo.git');
      expect(result.ref).toBe('');
      expect(result.subdir).toBe('subdir');
    });
    it('should parse GitHub URLs correctly: user/repo#branch/subdir', () => {
      // Example: user/repo#branch/subdir
      const githubUrl = 'user/repo#branch/subdir';
      const result = parseTemplateSource(githubUrl);
      expect(result.repoUrl).toBe('https://github.com/user/repo.git');
      expect(result.ref).toBe('branch');
      expect(result.subdir).toBe('subdir');
    });
  });

  describe('should parse customDomain URLs correctly git@customDomain.com', () => {
    it('should parse customDomain URLs correctly: git@customDomain.com:user/repo.git', () => {
      const customDomainUrl = 'git@customDomain.com:user/repo.git';
      const result = parseTemplateSource(customDomainUrl);
      expect(result.repoUrl).toBe('git@customDomain.com:user/repo.git');
      expect(result.ref).toBe('');
      expect(result.subdir).toBe('');
      expect(result.isGithub).toBe(false);
    });
    it('should parse customDomain URLs with branch: git@customDomain.com:user/repo.git#branch', () => {
      const customDomainUrl = 'git@customDomain.com:user/repo.git#branch';
      const result = parseTemplateSource(customDomainUrl);
      expect(result.repoUrl).toBe('git@customDomain.com:user/repo.git');
      expect(result.ref).toBe('branch');
      expect(result.subdir).toBe('');
      expect(result.isGithub).toBe(false);
    });
    it('should parse customDomain URLs with subdir: git@customDomain.com:user/repo.git/subdir', () => {
      const customDomainUrl = 'git@customDomain.com:user/repo.git/subdir';
      const result = parseTemplateSource(customDomainUrl);
      expect(result.repoUrl).toBe('git@customDomain.com:user/repo.git');
      expect(result.ref).toBe('');
      expect(result.subdir).toBe('subdir');
      expect(result.isGithub).toBe(false);
    });
  });

  describe('should parse git URLs correctly ssh://', () => {
    it('should parse git URLs: ssh://git@customDomain.com/user/repo.git', () => {
      const gitUrl = 'ssh://git@customDomain.com/user/repo.git';
      const result = parseTemplateSource(gitUrl);
      expect(result.repoUrl).toBe('ssh://git@customDomain.com/user/repo.git');
      expect(result.ref).toBe('');
      expect(result.subdir).toBe('');
      expect(result.isGithub).toBe(false);
    });
  });
});
