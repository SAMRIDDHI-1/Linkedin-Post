'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toneOptions = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'Formal, business-oriented',
      icon: '💼',
      color: '#0a66c2',
      gradient: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)'
    },
    {
      id: 'casual',
      title: 'Casual',
      description: 'Friendly, conversational',
      icon: '💬',
      color: '#666666',
      gradient: 'linear-gradient(135deg, #666666 0%, #4d4d4d 100%)'
    },
    {
      id: 'inspirational',
      title: 'Inspirational',
      description: 'Motivational, uplifting',
      icon: '✨',
      color: '#ff9c00',
      gradient: 'linear-gradient(135deg, #ff9c00 0%, #ff7823 100%)'
    },
    {
      id: 'thought',
      title: 'Thought Leader',
      description: 'Authoritative, insightful',
      icon: '🧠',
      color: '#8d6cab',
      gradient: 'linear-gradient(135deg, #8d6cab 0%, #6b4b8a 100%)'
    }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!topic) return;

    setIsLoading(true);
    setResults([]);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, tone: selectedTone }),
      });

      const data = await response.json();
      console.log("API response:", data);
      
      // Process the response to extract the posts
      if (data.post1) {
        // If the response contains post1, post2, etc. properties
        const posts = [];
        let i = 1;
        while (data[`post${i}`]) {
          posts.push({ content: data[`post${i}`] });
          i++;
        }
        setResults(posts);
      } else {
        setResults(data.posts || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setResults([{content: 'Sorry, there was an error generating posts. Please try again.'}]);
    }
    setIsLoading(false);
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f2ef',
      padding: '0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      background: 'linear-gradient(135deg, #f3f2ef 0%, #e8e6e1 100%)'
    }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
        padding: '40px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom: '40px',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '20px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold' }}>✨</span>
            </div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              margin: 0,
              letterSpacing: '-1px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
              PostCraft Pro
            </h1>
          </div>
          <p style={{ 
            fontSize: '20px', 
            margin: 0,
            opacity: 0.9,
            fontWeight: '400',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            AI-powered LinkedIn content creation for professionals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px 60px 20px'
      }}>
        
        {/* Single Column Layout for Better Readability */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
          padding: '50px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          marginBottom: '40px'
        }}>
          
          {/* Header Section */}
          <div style={{ textAlign: 'center',marginBottom: '50px' }}>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '600', 
              color: '#191919',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Create Stunning Content
            </h2>
            <p style={{ 
              color: '#666666', 
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Transform your ideas into engaging LinkedIn posts that drive meaningful conversations and build your professional brand.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: '50px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            
            {/* Input Form Section */}
            <div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* Topic Input */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#191919', 
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ color: '#0a66c2', fontSize: '24px' }}>📝</span>
                    What&apos;s your expertise?
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Share your knowledge, experience, or insights... (e.g., Effective strategies for remote team collaboration in tech companies)"
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '20px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: '120px',
                      lineHeight: '1.6',
                      transition: 'all 0.3s ease',
                      background: '#fafafa'
                    }}
                    disabled={isLoading}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0a66c2';
                      e.target.style.background = '#ffffff';
                      e.target.style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.background = '#fafafa';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Tone Selection */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#191919', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ color: '#0a66c2', fontSize: '24px' }}>🎭</span>
                    Choose your voice tone
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '16px' 
                  }}>
                    {toneOptions.map((tone) => (
                      <div
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        style={{
                          padding: '24px 20px',
                          border: `2px solid ${selectedTone === tone.id ? tone.color : '#e0e0e0'}`,
                          borderRadius: '16px',
                          background: selectedTone === tone.id ? tone.gradient : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {selectedTone === tone.id && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span style={{ color: tone.color, fontSize: '12px', fontWeight: 'bold' }}>✓</span>
                          </div>
                        )}
                        <div style={{ 
                          fontSize: '32px', 
                          marginBottom: '12px',
                          filter: selectedTone === tone.id ? 'brightness(0) invert(1)' : 'none'
                        }}>
                          {tone.icon}
                        </div>
                        <div style={{ 
                          fontWeight: '600', 
                          color: selectedTone === tone.id ? 'white' : tone.color,
                          marginBottom: '6px',
                          fontSize: '16px'
                        }}>
                          {tone.title}
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          color: selectedTone === tone.id ? 'rgba(255,255,255,0.9)' : '#666666',
                          lineHeight: '1.4'
                        }}>
                          {tone.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !topic}
                  style={{
                    background: isLoading || !topic ? 
                      'linear-gradient(135deg, #cccccc 0%, #999999 100%)' : 
                      'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                    color: 'white',
                    fontWeight: '600',
                    padding: '20px 40px',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: isLoading || !topic ? 'not-allowed' : 'pointer',
                    fontSize: '18px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(10, 102, 194, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: '20px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && topic) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 30px rgba(10, 102, 194, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading && topic) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 20px rgba(10, 102, 194, 0.3)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{ marginRight: '12px' }}>⏳</span>
                      Crafting Your Masterpiece...
                    </>
                  ) : (
                    <>
                      <span style={{ marginRight: '12px' }}>🚀</span>
                      Generate Professional Posts
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results Section - Appears below the form */}
            {results.length > 0 && (
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '32px',
                  padding: '0 8px'
                }}>
                  <h3 style={{ 
                    fontSize: '24px', 
                    fontWeight: '600', 
                    color: '#191919',
                    margin: 0
                  }}>
                    Generated Content
                  </h3>
                  <span style={{ 
                    backgroundColor: '#0a66c2',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {results.length} Options
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {results.map((post, index) => {
                    // Get the post content regardless of property name
                    const postContent = post.content || post.title || post.text || 
                                      (typeof post === 'string' ? post : JSON.stringify(post));
                    
                    return (
                      <div key={index} style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        borderRadius: '16px',
                        padding: '32px',
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          height: '4px',
                          width: '100%',
                          background: 'linear-gradient(90deg, #0a66c2 0%, #004182 100%)'
                        }} />
                        
                        <div style={{ 
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                          color: 'white',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: '700',
                          boxShadow: '0 2px 10px rgba(10, 102, 194, 0.3)'
                        }}>
                          {index + 1}
                        </div>
                        
                        <div style={{ 
                          color: '#191919', 
                          lineHeight: '1.7',
                          marginBottom: '28px',
                          whiteSpace: 'pre-wrap',
                          fontSize: '16px',
                          paddingRight: '40px'
                        }}>
                          {postContent}
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            onClick={() => copyToClipboard(postContent, index)}
                            style={{
                              background: copiedIndex === index ? '#10b981' : 'transparent',
                              color: copiedIndex === index ? 'white' : '#0a66c2',
                              border: `2px solid ${copiedIndex === index ? '#10b981' : '#0a66c2'}`,
                              padding: '12px 24px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            {copiedIndex === index ? '✅ Copied!' : '📋 Copy Text'}
                          </button>
                          
                          <button
                            onClick={() => {
                              window.open(`https://www.linkedin.com/shareArticle?mini=true&text=${encodeURIComponent(postContent)}`, '_blank');
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                              color: 'white',
                              border: 'none',
                              padding: '12px 24px',
                              borderRadius: '25px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: '0 2px 10px rgba(10, 102, 194, 0.3)'
                            }}
                          >
                            🔗 Share on LinkedIn
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '20px',
                padding: '60px 40px',
                textAlign: 'center',
                border: '2px dashed #dee2e6',
                marginTop: '40px'
              }}>
                <div style={{ 
                  fontSize: '48px',
                  marginBottom: '24px',
                  animation: 'pulse 2s infinite'
                }}>
                  ⚡
                </div>
                <h3 style={{ 
                  color: '#191919', 
                  marginBottom: '16px',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  AI is Working Its Magic
                </h3>
                <p style={{ 
                  color: '#666666',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  Our advanced AI is crafting professional, engaging LinkedIn content tailored specifically for you...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '40px',
           maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#0a66c2', marginBottom: '12px' }}>✨</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#191919', marginBottom: '8px' }}>AI-Powered</div>
              <div style={{ fontSize: '16px', color: '#666666' }}>Advanced content generation</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#0a66c2', marginBottom: '12px' }}>🚀</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#191919', marginBottom: '8px' }}>Professional</div>
              <div style={{ fontSize: '16px', color: '#666666' }}>LinkedIn-optimized content</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#0a66c2', marginBottom: '12px' }}>💡</div>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#191919', marginBottom: '8px' }}>Engaging</div>
              <div style={{ fontSize: '16px', color: '#666666' }}>Drive meaningful conversations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <div style={{ 
        marginTop: '60px',
        padding: '40px 0',
        borderTop: '1px solid #e0e0e0'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Main Footer Content */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px',
            marginBottom: '30px'
          }}>
            {/* Product Info */}
            <div>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#191919',
                marginBottom: '20px'
              }}>
                PostCraft Pro
              </h4>
              <p style={{ 
                color: '#666666', 
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                AI-powered LinkedIn content creation tool designed for professionals who want to stand out and drive engagement.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <span style={{ 
                  backgroundColor: '#0a66c2',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  AI Powered
                </span>
                <span style={{ 
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  Free to Use
                </span>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#191919',
                marginBottom: '20px'
              }}>
                Features
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0a66c2' }}>✓</span>
                  <span style={{ color: '#666666' }}>Multiple Tone Options</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0a66c2' }}>✓</span>
                  <span style={{ color: '#666666' }}>Professional Formatting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0a66c2' }}>✓</span>
                  <span style={{ color: '#666666' }}>One-Click Sharing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0a66c2' }}>✓</span>
                  <span style={{ color: '#666666' }}>Copy to Clipboard</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#191919',
                marginBottom: '20px'
              }}>
                Support
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#" style={{ 
                  color: '#0a66c2', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>📧</span>
                  Report an Issue
                </a>
                <a href="#" style={{ 
                  color: '#0a66c2', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                 gap: '10px'
                }}>
                  <span>💡</span>
                  Feature Request
                </a>
                <a href="#" style={{ 
                  color: '#0a66c2', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>🔧</span>
                  API Documentation
                </a>
              </div>
            </div>
          </div>

          {/* Copyright and Credits */}
          <div style={{ 
            borderTop: '1px solid #e0e0e0',
            paddingTop: '30px',
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ color: '#666666' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                  © 2024 PostCraft Pro. All rights reserved.
                </p>
                <p style={{ margin: '0', fontSize: '12px', color: '#999999' }}>
                  This tool is for professional use only. Generated content should be reviewed before posting.
                </p>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
                padding: '12px 24px',
                borderRadius: '25px',
                color: 'white',
                fontWeight: '600'
              }}>
                Made with ❤️ by Samriddhi Tripathi
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '14px' }}>
                  Privacy Policy
                </a>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '14px' }}>
                  Terms of Service
                </a>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', fontSize: '14px' }}>
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}


