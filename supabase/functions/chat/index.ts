import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, userType, context } = await req.json()

    // Get Perplexity API key from Supabase secrets
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    // Enhance system prompt based on user type and context
    const systemPrompt = userType === 'business' 
      ? `You are a helpful business assistant for Sanchaari, a group travel planning platform. You help business partners with:
         - Booking management and analytics
         - Partner onboarding and support
         - Revenue insights and reporting
         - Customer relationship management
         - Platform features for businesses
         
         Current context: ${context || 'General business inquiry'}
         
         Be professional, concise, and provide actionable business insights. Focus on helping partners grow their business and manage their offerings effectively.`
      : `You are a helpful travel assistant for Sanchaari, a group travel planning platform. You help users with:
         - Group trip planning and coordination
         - Destination recommendations
         - Booking assistance and management
         - Travel tips and advice
         - Platform features and usage
         
         Current context: ${context || 'General travel inquiry'}
         
         Be friendly, enthusiastic about travel, and provide practical travel advice. Help users plan amazing group trips and make the most of the platform.`

    // Prepare messages for Perplexity API
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10) // Keep last 10 messages for context
    ]

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: apiMessages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 800,
        return_images: false,
        return_related_questions: false,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.'

    return new Response(
      JSON.stringify({ response: assistantResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Chat function error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Sorry, I\'m having trouble responding right now. Please try again in a moment.' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})